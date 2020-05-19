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

        private MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<JObject>>> cache = new MonsterIndexBackedIndex.View<(string, string), Task<JumpBallConcurrent<JObject>>>();

        public async Task<string> Get(string entityName, string entityOwner) {
            var jumpBall = await PrivateGet(entityName, entityOwner);
            var jobjectResult = jumpBall.Read();
            return jobjectResult.ToString();
        }

        public async Task<string> Do(string entityName, string entityOwner, Func<JObject, JObject> modify)
        {


            var jumpBall = await PrivateGet(entityName, entityOwner);

            var jobjectResult = await jumpBall.RunAsync(async jobject =>
            {
                jobject = modify(jobject);

                var result = await (await table).ExecuteAsync(TableOperation.InsertOrReplace(new Entity(entityName, entityOwner)
                {
                    JSON = jobject.ToString(),
                }));

                return JObject.Parse(result.Result.SafeCastTo<object, Entity>().JSON);
            });

            return jobjectResult.ToString();
        }

        private async Task<JumpBallConcurrent<JObject>> PrivateGet(string entityName, string entityOwner)
        {
            if (entityName is null)
            {
                throw new ArgumentNullException(nameof(entityName));
            }

            if (entityOwner is null)
            {
                throw new ArgumentNullException(nameof(entityOwner));
            }

            var mine = new TaskCompletionSource<JumpBallConcurrent<JObject>>();
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
                mine.SetResult(new JumpBallConcurrent<JObject>(JObject.Parse(entity.JSON)));
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