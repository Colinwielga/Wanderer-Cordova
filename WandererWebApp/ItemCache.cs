using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
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
    public class Payload { 
        public JObject JObject { get; set; }
        public List<string> RecentChanges { get; set; }

        //internal Payload Clone()
        //{
        //    return new Payload
        //    {
        //        JObject = (JObject)JObject.DeepClone(),
        //        RecentChanges = RecentChanges.ToList(),
        //    };
        //}
    }

    public interface ITableName { 
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
        where T: ITableName
    {

        private readonly Task<CloudTable> table;
        private Job timer;

        private class Job {
            private readonly ItemCache<T> itemCache;

            public Job(ItemCache<T> itemCache)
            {
                this.itemCache = itemCache;
            }

            public async Task Do() {
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
            public ConcurrentLinkedList<EntityChanges> RecentChanges;
            private readonly string rowKey;
            private readonly string partitionKey;
            private readonly ItemCache<T> itemCache;
            public JObject jObject;
            private bool dirty;
            private DateTime lastUpdate;
            private DateTime firstUpdate;

            public DataToSave(JObject jObject, ItemCache<T> itemCache, string rowKey, string partitionKey, ConcurrentLinkedList<EntityChanges> recentChanges)
            {
                this.jObject = jObject ?? throw new ArgumentNullException(nameof(jObject));
                this.itemCache = itemCache ?? throw new ArgumentNullException(nameof(itemCache));
                this.rowKey = rowKey ?? throw new ArgumentNullException(nameof(partitionKey));
                this.partitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
                this.RecentChanges = recentChanges ?? throw new ArgumentNullException(nameof(recentChanges));
            }

            internal async Task SaveIfNeeded(CloudTable table)
            {
                if (dirty && (DateTime.UtcNow - lastUpdate > TimeSpan.FromMinutes(1)|| DateTime.UtcNow - firstUpdate > TimeSpan.FromMinutes(3))) {
                    // save
                     await table.ExecuteAsync(TableOperation.InsertOrReplace(new Entity(rowKey, partitionKey)
                    {
                        JSON = jObject.ToString(),
                    }));

                    dirty = false;
                }
            }

            // assumes this is the start of this list
            // it is weird for it to live in here but we need checking dirty and removing to be a transaction
            internal bool TryRemove() {
                if (!dirty)
                {
                    itemCache.ToSaves.RemoveStart();
                    return true;
                }
                return false;
            }

            internal void Update(Func<JObject, JObject> update, JumpBallConcurrent<DataToSave> self) {
                this.jObject = update(jObject);
                if (!dirty) {
                    firstUpdate = DateTime.UtcNow;
                    itemCache.ToSaves.Add(self);
                }
                dirty = true;
                lastUpdate = DateTime.UtcNow;
            }
        }

        private ConcurrentLinkedList<JumpBallConcurrent<DataToSave>> ToSaves = new ConcurrentLinkedList<JumpBallConcurrent<DataToSave>>();

        private MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>> cache = new MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>>();

        public async Task<Payload> GetOrInit(string rowKey, string partitionKey, Func<JObject> init) {
            var jumpBall = await PrivateGet(rowKey, partitionKey, init);


            var jobjectResult = jumpBall.Read(); 
            return new Payload
            {
                JObject = jobjectResult.jObject,
                RecentChanges = jobjectResult.RecentChanges.Select(x => x.ChangeId).ToList()
            };
        }

        // Payload
        // { JObject : {"Shared-Notes":"somethin about how it's working" }, RecentChages: ["234qasdf","a35ased43asd"]}
        // JObject
        // {"Shared-Notes":"somethin about how it's working" }

        public async Task PassoverToSaveAsync() {
            timer = null;
            var readyTable = await table;

            foreach (var toSave in ToSaves)
            {
                await toSave.RunAsync(async x=> { await x.SaveIfNeeded(readyTable); return x; });
            }
            var go = true;
            while (go && ToSaves.TryGetFirst(out var dataToSave)) {
                dataToSave.Run(x =>
                {
                    go = x.TryRemove();
                    return x;
                });
            }
            var myJob = new Job(this);
            if (ToSaves.TryGetFirst(out var _) && null == Interlocked.CompareExchange(ref timer, myJob, null)) {
                var dontWait = Task.Run(myJob.Do);
            }
        }

        public async Task<Payload> Do(string entityName, string entityOwner, Func<JObject, IReadOnlyList<EntityChanges>, JObject> modify, EntityChanges change)
        {

            var jumpBall = await PrivateGet(entityName, entityOwner, () => new JObject());
            return Update(modify, change, jumpBall);
        }

        public async Task Set(string entityName, string entityOwner, JObject newValue, EntityChanges change)
        {

            var didIt = false;
            var jumpBall = await PrivateGet(entityName, entityOwner, () => { didIt = true ; return newValue; });
            if (!didIt) {
                Update((_,_) => newValue, change, jumpBall);
            }
        }

        private Payload Update(Func<JObject, IReadOnlyList<EntityChanges>, JObject> modify, EntityChanges change, JumpBallConcurrent<DataToSave> jumpBall)
        {
            Payload res = null;

            var jobjectResult = jumpBall.Run(dts =>
            {
                dts.Update(x =>
                {
                    dts.jObject = modify(x, dts.RecentChanges);
                    dts.RecentChanges.Add(change);
                    while (dts.RecentChanges.Count > 100)
                    {
                        dts.RecentChanges.RemoveStart();
                    }
                    return dts.jObject;

                }, jumpBall);

                res = new Payload
                {
                    JObject = dts.jObject,
                    RecentChanges = dts.RecentChanges.Select(x => x.ChangeId).ToList()
                };

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

                //try
                //{
                    var readyTable = await table;
                    var result = await readyTable.ExecuteAsync(retrieveOperation);
               
                    var entity = result.Result.SafeCastTo<object, Entity>();
                    if (entity == null)
                    {
                        entity = new Entity(rowKey,partitionKey)
                        {
                            JSON = init().ToString(),
                        };
                        var tableResult = (await readyTable.ExecuteAsync(TableOperation.Insert(entity)));
                        entity = tableResult.Result.SafeCastTo<object, Entity>();
                    }
                    mine.SetResult(new JumpBallConcurrent<DataToSave>(new DataToSave(JObject.Parse(entity.JSON), this, rowKey, partitionKey, new ConcurrentLinkedList<EntityChanges>())));
                //}
                //    catch (Exception e)
                //{
                //    var db = 0;
                //}
            }
            var jumpBall = await current;
            return jumpBall;
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
    }
}