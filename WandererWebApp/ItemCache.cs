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

    public class InnerPayload
    {
        public JObject JObject { get; set; }
        public List<EntityChanges> RecentChanges { get; set; }

        internal ReturnedPayload ToReturnable()
        {
            return new ReturnedPayload
            {
                JObject = this.JObject,
                RecentChanges = this.RecentChanges.Select(x => x.ChangeId).ToList(),
            };
        }

        internal InnerPayload Clone()
        {
            return new InnerPayload
            {
                JObject = (JObject)JObject.DeepClone(),
                RecentChanges = RecentChanges.ToList(),
            };
        }
    }

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
                await Task.Delay(TimeSpan.FromSeconds(10));

                await itemCache.PassoverToSaveAsync();
            }
        }

        public ItemCache(IConfiguration config, T tableName)
        {
            table = Storage.CreateTableAsync(config.GetConnectionString("wanderer-table-storage"), tableName.Name);
        }

        private class DataToSave
        {
            private readonly string rowKey;
            private readonly string partitionKey;
            private readonly ItemCache<T> itemCache;
            public InnerPayload jObject;
            private bool dirty;
            private DateTime lastUpdate;
            private DateTime firstUpdate;

            public DataToSave(InnerPayload jObject, ItemCache<T> itemCache, string rowKey, string partitionKey)
            {
                this.jObject = jObject ?? throw new ArgumentNullException(nameof(jObject));
                this.itemCache = itemCache ?? throw new ArgumentNullException(nameof(itemCache));
                this.rowKey = rowKey ?? throw new ArgumentNullException(nameof(partitionKey));
                this.partitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
            }

            internal async Task SaveIfNeeded(CloudTable table)
            {
                if (dirty && (DateTime.UtcNow - lastUpdate > TimeSpan.FromMinutes(1) || DateTime.UtcNow - firstUpdate > TimeSpan.FromMinutes(3)))
                {
                    // save
                    await table.ExecuteAsync(TableOperation.InsertOrReplace(EntityRehydrator.Dehydrate(jObject, rowKey, partitionKey)));

                    dirty = false;
                }
            }

            // assumes this is the start of this list
            // it is weird for it to live in here but we need checking dirty and removing to be a transaction
            internal bool TryRemove()
            {
                if (!dirty)
                {
                    itemCache.ToSaves.RemoveStart();
                    return true;
                }
                return false;
            }

            internal void Update(Func<InnerPayload, InnerPayload> update, JumpBallConcurrent<DataToSave> self)
            {
                this.jObject = update(jObject.Clone());
                if (!dirty)
                {
                    firstUpdate = DateTime.UtcNow;
                    itemCache.ToSaves.Add(self);
                }
                dirty = true;
                lastUpdate = DateTime.UtcNow;
            }
        }

        private ConcurrentLinkedList<JumpBallConcurrent<DataToSave>> ToSaves = new ConcurrentLinkedList<JumpBallConcurrent<DataToSave>>();

        private MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>> cache = new MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>>();

        public async Task<ReturnedPayload> GetOrInit(string rowKey, string partitionKey, Func<JObject> init)
        {
            var jumpBall = await PrivateGet(rowKey, partitionKey, init);

            var jobjectResult = jumpBall.Read();
            var inner = jobjectResult.jObject;
            return inner.ToReturnable();
        }

        // Payload
        // { JObject : {"Shared-Notes":"somethin about how it's working" }, RecentChages: ["234qasdf","a35ased43asd"]}
        // JObject
        // {"Shared-Notes":"somethin about how it's working" }

        public async Task PassoverToSaveAsync()
        {
            timer = null;
            var readyTable = await table;

            foreach (var toSave in ToSaves)
            {
                await toSave.RunAsync(async x => { await x.SaveIfNeeded(readyTable); return x; });
            }
            var go = true;
            while (go && ToSaves.TryGetFirst(out var dataToSave))
            {
                dataToSave.Run(x =>
                {
                    go = x.TryRemove();
                    return x;
                });
            }
            var myJob = new Job(this);
            if (ToSaves.TryGetFirst(out var _) && null == Interlocked.CompareExchange(ref timer, myJob, null))
            {
                var dontWait = Task.Run(myJob.Do);
            }
        }

        public async Task<ReturnedPayload> Do(string entityName, string entityOwner, Func<JObject, IReadOnlyList<EntityChanges>, JObject> modify, EntityChanges change)
        {

            var jumpBall = await PrivateGet(entityName, entityOwner, () => new JObject());
            var inner = Update(modify, change, jumpBall);
            return inner.ToReturnable();
        }

        //public async Task Set(string entityName, string entityOwner, JObject newValue, EntityChanges change)
        //{

        //    var didIt = false;
        //    var jumpBall = await PrivateGet(entityName, entityOwner, () => { didIt = true ; return  newValue; });
        //    if (!didIt) {
        //        Update((_,_) => newValue, change, jumpBall);
        //    }
        //}

        private InnerPayload Update(Func<JObject, IReadOnlyList<EntityChanges>, JObject> modify, EntityChanges change, JumpBallConcurrent<DataToSave> jumpBall)
        {
            InnerPayload res = null;

            var jobjectResult = jumpBall.Run(dts =>
            {

                dts.Update(x =>
                {
                    res = x;
                    res.JObject = modify(res.JObject, res.RecentChanges);
                    res.RecentChanges.Add(change);
                    while (res.RecentChanges.Count > 100)
                    {
                        res.RecentChanges.RemoveAt(0);
                    }
                    dts.jObject = res;
                    return dts.jObject;

                }, jumpBall);



                return dts;
            });

            var myJob = new Job(this);
            if (null == Interlocked.CompareExchange(ref timer, myJob, null))
            {
                var dontWait = Task.Run(myJob.Do);
            }

            return res;
        }

        private async Task<JumpBallConcurrent<DataToSave>> PrivateGet(string rowKey, string partitionKey, Func<JObject> init)
        {
            if (rowKey is null)
            {
                throw new ArgumentNullException(nameof(rowKey));
            }

            if (partitionKey is null)
            {
                throw new ArgumentNullException(nameof(partitionKey));
            }

            var mine = new TaskCompletionSource<JumpBallConcurrent<DataToSave>>();
            var current = cache.GetOrAdd((rowKey, partitionKey), mine.Task);
            if (ReferenceEquals(mine.Task, current))
            {
                var retrieveOperation = TableOperation.Retrieve<Entity>(partitionKey, rowKey);

                var readyTable = await table;
                var result = await readyTable.ExecuteAsync(retrieveOperation);

                var entity = result.Result.SafeCastTo<object, Entity>();
                if (entity == null)
                {
                    entity = EntityRehydrator.Dehydrate(new InnerPayload
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
                               }
                            }
                        }
                    }, rowKey, partitionKey); ;
                    var tableResult = (await readyTable.ExecuteAsync(TableOperation.Insert(entity)));
                    entity = tableResult.Result.SafeCastTo<object, Entity>();
                }
                mine.SetResult(new JumpBallConcurrent<DataToSave>(new DataToSave(EntityRehydrator.Rehydrate(entity), this, rowKey, partitionKey)));

            }
            var jumpBall = await current;
            return jumpBall;
        }

    }

    public static class EntityRehydrator
    {

        public static InnerPayload Rehydrate(Entity entity)
        {
            if (entity.Version == default)
            {
                return new InnerPayload
                {
                    JObject = JObject.Parse(entity.JSON),
                    RecentChanges = new List<EntityChanges>()
                };
            }
            else if (entity.Version == 1)
            {
                return JsonConvert.DeserializeObject<InnerPayload>(entity.JSON);
            }
            throw new NotImplementedException("the version is greater than the current version!");
        }

        public static Entity Dehydrate(InnerPayload payload, string rowKey, string partitionKey)
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
}