using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Prototypist.TaskChain;
using Prototypist.Toolbox.Object;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WandererWebApp
{



    public class ReturnedPayload
    {
        public JObject JObject { get; set; }
        public List<string> RecentChanges { get; set; }
    }

    public interface ITableName
    {
        string Name { get; }
    }


    public class SharedEntitiesTableName : ITableName
    {
        public string Name => "SharedEntities";
    }

    public class AccountsTableName : ITableName
    {
        public string Name => "Accounts";
    }

    public class CharactersTableName : ITableName
    {
        public string Name => "Characters";
    }

    public class CampaignsTableName : ITableName
    {
        public string Name => "Campaigns";
    }

    // this generic is unfortunately unbridled creativilty
    // I want to get different version of this out of DI
    // I don't understand DI 
    public class ItemCache<T>
        where T : ITableName
    {

        private readonly Task<CloudTable> table;
        private Job timer;

        private class Job
        {
            private readonly ItemCache<T> itemCache;

            public Job(ItemCache<T> itemCache)
            {
                this.itemCache = itemCache;
            }

            public async Task Do()
            {
                await Task.Delay(TimeSpan.FromSeconds(10)).ConfigureAwait(false);

                await itemCache.PassoverToSaveAsync().ConfigureAwait(false);
            }
        }

        public ItemCache(IConfiguration config, T tableName)
        {
            table = Storage.CreateTableAsync(config.GetConnectionString("wanderer-table-storage"), tableName.Name);
        }

        private class CacheEntry
        {
            private readonly string rowKey;
            private readonly string partitionKey;
            private readonly ItemCache<T> itemCache;
            public OptimisticConcurrent<SaveInDatabase> data;
            private DateTime lastUpdate;
            private DateTime firstUpdate;

            public CacheEntry(SaveInDatabase jObject, ItemCache<T> itemCache, string rowKey, string partitionKey)
            {
                if (jObject is null)
                {
                    throw new ArgumentNullException(nameof(jObject));
                }

                this.data = new OptimisticConcurrent<SaveInDatabase>(jObject);
                this.itemCache = itemCache ?? throw new ArgumentNullException(nameof(itemCache));
                this.rowKey = rowKey ?? throw new ArgumentNullException(nameof(partitionKey));
                this.partitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
            }

            internal async Task<bool> SaveIfNeeded(CloudTable table)
            {
                if (DateTime.UtcNow - lastUpdate > TimeSpan.FromMinutes(1) || DateTime.UtcNow - firstUpdate > TimeSpan.FromMinutes(3))
                {
                    // save
                    await table.ExecuteAsync(TableOperation.InsertOrReplace(EntityRehydrator.Dehydrate(data.Read(), rowKey, partitionKey))).ConfigureAwait(false);
                    return true;
                }
                return false;
            }


            internal void Update(Func<SaveInDatabase, SaveInDatabase> update)
            {
                data.Update(update);
                // I'm not going to worry about a little bit of racing 
                if (!itemCache.ToSaves.Contains(this))
                {
                    firstUpdate = DateTime.UtcNow;
                    itemCache.ToSaves.Add(this);
                }
                lastUpdate = DateTime.UtcNow;
            }
        }

        private readonly ConcurrentLinkedList<CacheEntry> ToSaves = new ConcurrentLinkedList<CacheEntry>();

        private readonly MonsterIndexBackedIndex.View<(string, string), Task<CacheEntry>> cache = new MonsterIndexBackedIndex.View<(string, string), Task<CacheEntry>>();

        public async Task<ReturnedPayload> GetOrInit(string rowKey, string partitionKey, Func<JObject> init)
        {
            var jumpBall = await PrivateGet(rowKey, partitionKey, init).ConfigureAwait(false);

            return jumpBall.data.Read().ToReturnable();
        }

        // Payload
        // { JObject : {"Shared-Notes":"somethin about how it's working" }, RecentChages: ["234qasdf","a35ased43asd"]}
        // JObject
        // {"Shared-Notes":"somethin about how it's working" }

        public async Task PassoverToSaveAsync()
        {
            timer = null;
            var readyTable = await table.ConfigureAwait(false);
            var toAdds = new List<CacheEntry>();
            while (ToSaves.RemoveStart(out var toSave))
            {
                if (!await toSave.SaveIfNeeded(readyTable).ConfigureAwait(false)) {
                    // we didn't save add it back to the list
                    toAdds.Add(toSave);
                }
            }

            foreach (var toAdd in toAdds)
            {
                ToSaves.Add(toAdd);
            }

            // if anything is in ToSaves, run again soon
            var myJob = new Job(this);
            if (ToSaves.TryGetFirst(out var _) && null == Interlocked.CompareExchange(ref timer, myJob, null))
            {
                var dontWait = Task.Run(myJob.Do);
            }
        }

        public async Task<ReturnedPayload> Do(string entityName, string entityOwner, Func<JObject, IReadOnlyList<EntityChanges>, (JObject, EntityChanges)> modify)
        {
            var jumpBall = await PrivateGet(entityName, entityOwner, () => new JObject()).ConfigureAwait(false);
            var inner = Update(modify, jumpBall);
            return inner.ToReturnable();
        }

        //public async Task Set(string entityName, string entityOwner, JObject newValue, EntityChanges change)
        //{

        //    var didIt = false;
        //    var jumpBall = await PrivateGet(entityName, entityOwner, () => { didIt = true ; return  newValue; }).ConfigureAwait(false);
        //    if (!didIt) {
        //        Update((_,_) => newValue, change, jumpBall);
        //    }
        //}

        private SaveInDatabase Update(Func<JObject, IReadOnlyList<EntityChanges>, (JObject, EntityChanges)> modify, CacheEntry jumpBall)
        {
            SaveInDatabase res = null;

            jumpBall.Update(x =>
            {
                res = x;
                var (obj,appliedChange) = modify(res.JObject, res.RecentChanges);
                res.JObject = obj;
                res.RecentChanges.Add(appliedChange);
                while (res.RecentChanges.Count > 100)
                {
                    res.RecentChanges.RemoveAt(0);
                }
                return res;
            });

            var myJob = new Job(this);
            if (null == Interlocked.CompareExchange(ref timer, myJob, null))
            {
                var dontWait = Task.Run(myJob.Do);
            }

            return res;
        }

        private async Task<CacheEntry> PrivateGet(string rowKey, string partitionKey, Func<JObject> init)
        {
            if (rowKey is null)
            {
                throw new ArgumentNullException(nameof(rowKey));
            }

            if (partitionKey is null)
            {
                throw new ArgumentNullException(nameof(partitionKey));
            }

            var mine = new TaskCompletionSource<CacheEntry>();
            var current = cache.GetOrAdd((rowKey, partitionKey), mine.Task);
            if (ReferenceEquals(mine.Task, current))
            {
                var retrieveOperation = TableOperation.Retrieve<Entity>(partitionKey, rowKey);

                var readyTable = await table.ConfigureAwait(false);
                var result = await readyTable.ExecuteAsync(retrieveOperation).ConfigureAwait(false);

                var entity = result.Result.SafeCastTo<object, Entity>();
                if (entity == null)
                {
                    entity = EntityRehydrator.Dehydrate(new SaveInDatabase
                    {
                        JObject = init(),
                        RecentChanges = new List<EntityChanges>() 
                        {
                            new EntityChanges
                            {
                               ChangeId = Guid.NewGuid().ToString("D"),
                               Operations = new []{ new OperationSplit {
                                       Name = nameof(InitOperation),
                                       JSON = JsonConvert.SerializeObject(new InitOperation{})
                                   }
                               },
                               // what do we have source ID?
                               // find all for {26E6C5FD-EAE7-40AC-BF0E-FBAFFA2EC40C}
                               SourceId = Guid.NewGuid().ToString("D"),
                            }
                        }
                    }, rowKey, partitionKey); ;
                    var tableResult = await readyTable.ExecuteAsync(TableOperation.Insert(entity)).ConfigureAwait(false);
                    entity = tableResult.Result.SafeCastTo<object, Entity>();
                }
                mine.SetResult(new CacheEntry(EntityRehydrator.Rehydrate(entity), this, rowKey, partitionKey));

            }
            var jumpBall = await current.ConfigureAwait(false);
            return jumpBall;
        }

    }

    public static class EntityRehydrator
    {

        public static SaveInDatabase Rehydrate(Entity entity)
        {
            if (entity.Version == default)
            {
                return new SaveInDatabase
                {
                    JObject = JObject.Parse(entity.JSON),
                    RecentChanges = new List<EntityChanges>()
                };
            }
            else if (entity.Version == 1)
            {
                return JsonConvert.DeserializeObject<SaveInDatabase>(entity.JSON);
            }
            throw new NotImplementedException("the version is greater than the current version!");
        }

        public static Entity Dehydrate(SaveInDatabase payload, string rowKey, string partitionKey)
        {
            return new Entity(rowKey, partitionKey)
            {
                JSON = JsonConvert.SerializeObject(payload),
                Version = 1,
            };
        }
    }

    public class Entity : TableEntity
    {
        /// <summary>
        /// must expose a parameter-less constructor
        /// </summary>
        public Entity()
        {
        }
        public Entity(string rowKey, string partitionKey)
        {
            PartitionKey = partitionKey;
            RowKey = rowKey;
        }
        public string JSON { get; set; }
        public int Version { get; set; }
    }

    public class SaveInDatabase: ICopy<SaveInDatabase>
    {
        public JObject JObject { get; set; }
        public List<EntityChanges> RecentChanges { get; set; }

        internal ReturnedPayload ToReturnable()
        {
            return new ReturnedPayload
            {
                JObject = this.JObject,
                RecentChanges = this.RecentChanges.Select(x => x.ChangeId).TakeLast(20).ToList(),
            };
        }

        public SaveInDatabase Copy()
        {
            return new SaveInDatabase
            {
                JObject = (JObject)JObject.DeepClone(),
                RecentChanges = RecentChanges.ToList(),
            };
        }
    }
}