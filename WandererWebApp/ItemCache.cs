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

        internal Payload Clone()
        {
            return new Payload
            {
                JObject = (JObject)JObject.DeepClone(),
                RecentChanges = RecentChanges.ToList()
            };
        }
    }

    public class ItemCache
    {

        private readonly Task<CloudTable> table;
        private Job timer;

        private class Job {
            private readonly ItemCache itemCache;

            public Job(ItemCache itemCache)
            {
                this.itemCache = itemCache;
            }

            public async Task Do() {
                await Task.Delay(TimeSpan.FromSeconds(10));

                await itemCache.PassoverToSaveAsync();
            }
        }

        public ItemCache(IConfiguration config)
        {
            table = Storage.CreateTableAsync(config.GetConnectionString("wanderer-table-storage"), "SharedEntities");
        }

        private class DataToSave
        {
            private readonly string rowKey;
            private readonly string partitionKey;
            private readonly ItemCache itemCache;
            public Payload jObject;
            private bool dirty;
            private DateTime lastUpdate;
            private DateTime firstUpdate;

            public DataToSave(Payload jObject, ItemCache itemCache, string rowKey, string partitionKey)
            {
                this.jObject = jObject ?? throw new ArgumentNullException(nameof(jObject));
                this.itemCache = itemCache ?? throw new ArgumentNullException(nameof(itemCache));
                this.rowKey = rowKey ?? throw new ArgumentNullException(nameof(partitionKey));
                this.partitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
            }

            internal async Task SaveIfNeeded(CloudTable table)
            {
                if (dirty && (DateTime.UtcNow - lastUpdate > TimeSpan.FromMinutes(1)|| DateTime.UtcNow - firstUpdate > TimeSpan.FromMinutes(3))) {
                    // save
                     await table.ExecuteAsync(TableOperation.InsertOrReplace(new Entity(rowKey, partitionKey)
                    {
                        JSON = jObject.JObject.ToString(),
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

            internal void Update(Func<Payload, Payload> update, JumpBallConcurrent<DataToSave> self) {
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

        public async Task<Payload> GetOrInit(string rowKey, string partitionKey, Func<JObject, JObject> init) {
            var jumpBall = await PrivateGet(rowKey, partitionKey, init);


            var jobjectResult = jumpBall.Read();
            return jobjectResult.jObject;
        }

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

        public async Task<Payload> Do(string entityName, string entityOwner, Func<JObject, JObject> modify, string changeId)
        {

            var jumpBall = await PrivateGet(entityName, entityOwner, x=>throw new Exception(""));

            Payload res = null;

            var jobjectResult = jumpBall.Run(dts =>
            {
                dts.Update(x=> {

                    x.JObject = modify(x.JObject);
                    x.RecentChanges.Add(changeId);
                    if (x.RecentChanges.Count > 100) {
                        x.RecentChanges.RemoveAt(0);
                    }
                    res = x.Clone();
                    return x;

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

        private async Task<JumpBallConcurrent<DataToSave>> PrivateGet(string rowKey, string partitionKey, Func<JObject, JObject> init)
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
                var result = await (await table).ExecuteAsync(retrieveOperation);
                var entity = result.Result.SafeCastTo<object, Entity>();
                if (entity == null)
                {
                    entity = new Entity(rowKey,partitionKey)
                    {
                        JSON = init(new JObject()).ToString(),
                    };
                    var tableResult = (await (await table).ExecuteAsync(TableOperation.Insert(entity)));
                    entity = tableResult.Result.SafeCastTo<object, Entity>();
                }
                // TODO get from db
                // or put in db
                mine.SetResult(new JumpBallConcurrent<DataToSave>(new DataToSave(new Payload { JObject = JObject.Parse(entity.JSON), RecentChanges = new List<string>() },this, rowKey, partitionKey)));
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