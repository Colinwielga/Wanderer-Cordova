using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Prototypist.TaskChain;
using Prototypist.Toolbox.Object;
using System;
using System.Threading.Tasks;

namespace WandererWebApp
{
    public class ItemCache
    {

        private readonly Task<CloudTable> table;

        public ItemCache(IConfiguration config)
        {
            table = Storage.CreateTableAsync(config.GetConnectionString("wanderer-table-storage"), "SharedEntities");
        }

        private class DataToSave
        {
            string entityName;
            string entityOwner;
            bool dirty;
            DateTime lastUpdate;
            JObject jObject;
            ItemCache itemCache;

            public DataToSave(JObject jObject, ItemCache itemCache)
            {
                this.jObject = jObject;
            }

            internal async Task SaveIfNeeded(CloudTable table)
            {
                if (dirty && DateTime.UtcNow - lastUpdate > TimeSpan.FromMinutes(1)) {
                    // save
                     await table.ExecuteAsync(TableOperation.InsertOrReplace(new Entity(entityName, entityOwner)
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

            internal void Update(Func<JObject,JObject> update, JumpBallConcurrent<DataToSave> self) {
                this.jObject = update(jObject);
                if (!dirty) {
                    itemCache.ToSaves.Add(self);
                }
                dirty = true;
                lastUpdate = DateTime.UtcNow;
            }
        }

        private ConcurrentLinkedList<JumpBallConcurrent<DataToSave>> ToSaves = new ConcurrentLinkedList<JumpBallConcurrent<DataToSave>>();


        private MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>> cache = new MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<DataToSave>>>();

        public async Task<string> Get(string entityName, string entityOwner) {
            var jumpBall = await PrivateGet(entityName, entityOwner);
            var jobjectResult = jumpBall.Read();
            return jobjectResult.ToString();
        }

        public async Task PassoverToSave() {
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
        }

        public async Task<string> Do(string entityName, string entityOwner, Func<JObject, JObject> modify)
        {


            var jumpBall = await PrivateGet(entityName, entityOwner);

            var jobjectResult = await jumpBall.RunAsync(async dts =>
            {
                JObject res;
                dts.Update(x=> {

                    res = (JObject)modify(x).DeepClone();
                    return res;

                    }, jumpBall);

                return dts;
            });

            return jobjectResult.ToString();
        }

        private async Task<JumpBallConcurrent<DataToSave>> PrivateGet(string entityName, string entityOwner)
        {
            if (entityName is null)
            {
                throw new ArgumentNullException(nameof(entityName));
            }

            if (entityOwner is null)
            {
                throw new ArgumentNullException(nameof(entityOwner));
            }

            var mine = new TaskCompletionSource<JumpBallConcurrent<DataToSave>>();
            var current = cache.GetOrAdd((entityName, entityOwner), mine.Task);
            if (ReferenceEquals(mine.Task, current))
            {
                var retrieveOperation = TableOperation.Retrieve<Entity>(entityName, entityOwner);
                var result = await (await table).ExecuteAsync(retrieveOperation);
                var entity = result.Result.SafeCastTo<object, Entity>();
                if (entity == null)
                {
                    entity = new Entity(entityName, entityOwner)
                    {
                        JSON = new JObject().ToString(),
                    };
                    entity = (await (await table).ExecuteAsync(TableOperation.Insert(entity))).SafeCastTo<object, Entity>();
                }
                // TODO get from db
                // or put in db
                mine.SetResult(new JumpBallConcurrent<DataToSave>(new DataToSave(JObject.Parse(entity.JSON),this)));
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
        public Entity(string entityName, string entityOwner)
        {
            PartitionKey = entityOwner;
            RowKey = entityName;
        }
        public string JSON { get; set; }
    }
}