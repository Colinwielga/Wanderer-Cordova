﻿
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Prototypist.Toolbox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebApp
{

    public class Chat : Hub
    {
        private const string groupPrefix = "group-";
        private const string entityPrefix = "entity-";
        // need to think about this
        private const string EntityOwner = "{7362FB24-EE6A-4D46-AF13-C6343A3C21FF}";
        private readonly ItemCache<SharedEntitiesTableName> cache;

        public ILogger<Chat> Logger { get; }

        public Chat(ItemCache<SharedEntitiesTableName> cache, ILogger<Chat> logger)
        {
            this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public void JoinGame(string groupName)
        {

            Groups.AddToGroupAsync(Context.ConnectionId, groupPrefix + groupName);
        }

        public void BroadcastMessage(string groupName, object message)
        {
            Clients.Groups(groupPrefix + groupName).SendAsync("BroadcastMessage", groupName, message);
        }

        public async Task RequestEntity(string rowKey, string partitionKey, EntityChanges fallback)
        {

            try
            {

                if (rowKey.Contains("|"))
                {
                    throw new Exception($"invalid key: \"{rowKey}\", key cannot contain \"|\"");
                }
                if (partitionKey.Contains("|"))
                {
                    throw new Exception($"invalid key: \"{partitionKey}\", key cannot contain \"|\"");
                }

                await Groups.AddToGroupAsync(Context.ConnectionId, rowKey + "|" + partitionKey);

                var jsonString = JsonConvert.SerializeObject(await cache.GetOrInit(rowKey, partitionKey, () => ModifyObject(fallback)(new JObject(), new List<EntityChanges>())));

                var client = Clients.Client(Context.ConnectionId);

                await client.SendAsync("EntityUpdate", rowKey, partitionKey, jsonString);
            }
            catch (Exception e)
            {
                Logger.LogError(e.Message);
            }
        }

        public async Task UpdateSharedEntity(string rowKey, string partitionKey, EntityChanges entityChanges)
        {
            try
            {
                var jsonString = JsonConvert.SerializeObject(await cache.Do(rowKey, partitionKey, ModifyObject(entityChanges), entityChanges));

                var group = Clients.Groups(rowKey + "|" + partitionKey);

                await group.SendAsync("EntityUpdate", rowKey, partitionKey, jsonString);
            }
            catch (Exception e)
            {
                Logger.LogError(e.Message);
            }
        }

        private static Func<JObject, IReadOnlyList<EntityChanges>, JObject> ModifyObject(EntityChanges entityChanges) => (entity, recentChanges) =>
        {
            foreach (var item in entityChanges.Operations)
            {
                if (item.Name == nameof(AddOrSetOperation))
                {
                    var addOrSet = JsonConvert.DeserializeObject<AddOrSetOperation>(item.JSON);
                    var at = entity;
                    foreach (var pathPart in addOrSet.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }
                    at[addOrSet.Path.Last()] = ToValue(addOrSet.Value);
                }
                //else if (item.Name == nameof(DeleteOperation))
                //{
                //    var deleteOperation = JsonConvert.DeserializeObject<DeleteOperation>(item.JSON);
                //    var at = entity;
                //    foreach (var pathPart in deleteOperation.Path.SkipLast(1))
                //    {
                //        at = Navigate(at, pathPart);
                //    }
                //    at.Remove(deleteOperation.Path.Last());
                //}
                else if (item.Name == nameof(AddToSetOperation))
                {
                    var append = JsonConvert.DeserializeObject<AddToSetOperation>(item.JSON);
                    var at = entity; ;
                    foreach (var pathPart in append.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }
                    at[append.Path.Last()] = ToValue(append.Value);
                }
                else if (item.Name == nameof(RemoveFromSetOperation))
                {
                    var removeFromSet = JsonConvert.DeserializeObject<RemoveFromSetOperation>(item.JSON);
                    var at = entity; ;
                    foreach (var pathPart in removeFromSet.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }
                    at.Remove(removeFromSet.Path.Last());
                }
                else if (item.Name == nameof(ClearSetOperation))
                {
                    var clear = JsonConvert.DeserializeObject<ClearSetOperation>(item.JSON);
                    var at = entity; ;
                    foreach (var pathPart in clear.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }
                    at[clear.Path.Last()] = new JObject();
                    // duplicate code
                    // since sets are just object with need some way identify them
                    at[clear.Path.Last()]["is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652"] = "true-35EF2BBB-D1CA-4E64-BC28-7CB16392D652";
                }
                else if (item.Name == nameof(AddToNumberOperation))
                {
                    var addToNumber = JsonConvert.DeserializeObject<AddToNumberOperation>(item.JSON);
                    var at = entity; ;
                    foreach (var pathPart in addToNumber.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }
                    at[addToNumber.Path.Last()] = ((double)at[addToNumber.Path.Last()]) + addToNumber.Add;
                }
                else if (item.Name == nameof(UpdateCollaborativeString))
                {
                    var updateCollaborativeString = JsonConvert.DeserializeObject<UpdateCollaborativeString>(item.JSON);
                    var at = entity; ;
                    foreach (var pathPart in updateCollaborativeString.Path.SkipLast(1))
                    {
                        at = Navigate(at, pathPart);
                    }

                    var sourceChange = recentChanges.Where(x => x.ChangeId == updateCollaborativeString.FromChangeId).SingleOrDefault();

                    if (sourceChange == null)
                    {
                        // a change was applied to a really old version
                        // we just ignore it 
                        // for now
                        // TODO log
                        goto end;
                    }


                    // we want to be able to handle:
                    // say Scott chagned:
                    // hello my dear
                    // to:
                    // hello my dear,
                    // that would cteat a change
                    // {type: "add",  atIndex: 13, test ","}
                    //
                    // but on the server someone has deleted "my" so it has:
                    // hello dear
                    // here we need to intelligently find the index of the add

                    var reachedTheSouceChange = false;
                    foreach (var change in recentChanges)
                    {
                        if (reachedTheSouceChange)
                        {
                            foreach (var operation in change.Operations)
                            {
                                if (operation.Name == nameof(UpdateCollaborativeString))
                                {
                                    var innerUpdateCollaborativeString = JsonConvert.DeserializeObject<UpdateCollaborativeString>(item.JSON);
                                    if (innerUpdateCollaborativeString.Path.Zip(updateCollaborativeString.Path, (x, y) => x == y).All(x=>x)) {
                                        foreach (var innerChange in innerUpdateCollaborativeString.Changes)
                                        {
                                            foreach (var outerChange in updateCollaborativeString.Changes)
                                            {
                                                if (innerChange.AtIndex < outerChange.AtIndex && innerChange.AtIndex + innerChange.Text.Length > outerChange.AtIndex && innerChange.Type == "delete")
                                                {
                                                    // the text that included the change was deleted ignore the change
                                                    goto end;
                                                }
                                                else if(innerChange.AtIndex < outerChange.AtIndex && innerChange.Type == "delete") 
                                                {
                                                    outerChange.AtIndex -= innerChange.Text.Length;
                                                }
                                                else if (innerChange.AtIndex < outerChange.AtIndex && innerChange.Type == "add")
                                                {
                                                    outerChange.AtIndex += innerChange.Text.Length;
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (operation.Name == nameof(AddOrSetOperation))
                                {
                                    var addOrSet = JsonConvert.DeserializeObject<AddOrSetOperation>(item.JSON);
                                    // a hard set since our change... 
                                    // it would have overwritten our change.
                                    // don't apply the change
                                    goto end;
                                }
                            }
                        }
                        else if (change == sourceChange)
                        {
                            reachedTheSouceChange = true;
                        }
                    }

                    // go through the list of changes
                    // if it's an add, add it
                    // it it's a delete, delete it
                    foreach (var change in updateCollaborativeString.Changes)
                    {
                        if (change.Type == "add")
                        {
                            at[updateCollaborativeString.Path.Last()] = ((string)at[updateCollaborativeString.Path.Last()]).Insert(change.AtIndex, change.Text);
                        }
                        else if (change.Type == "delete")
                        {
                            at[updateCollaborativeString.Path.Last()] = ((string)at[updateCollaborativeString.Path.Last()]).Remove(change.AtIndex, change.Text.Length);
                        }
                        else
                        {
                            throw new NotImplementedException("should be an add or delete");
                        }
                    }


                end:;
                }
                else
                {
                    throw new Exception($"unexpected operation {item.Name}");
                }
            }
            return entity;
        };

        private static JObject Navigate(JObject x, string pathPart)
        {
            var thing = x[pathPart];
            if (thing is JObject jObject)
            {
                return jObject;
            }
            throw new Exception($"unexpected type of thing {thing.GetType()}");
        }

        private static JToken ToValue(ValueSplit value)
        {
            if (value.Name == nameof(StringValue))
            {
                var stringValue = JsonConvert.DeserializeObject<StringValue>(value.JSON);
                return stringValue.Value; // implict conversion... if I did not know those were a thing I would be really freaked out
            }
            else if (value.Name == nameof(NumberValue))
            {
                var numberValue = JsonConvert.DeserializeObject<NumberValue>(value.JSON);
                return numberValue.Value; // implict conversion... if I did not know those were a thing I would be really freaked out
            }
            else if (value.Name == nameof(SetValue))
            {
                var res = new JObject();
                // duplicate code
                // since sets are just object with need some way identify them
                res["is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652"] = "true-35EF2BBB-D1CA-4E64-BC28-7CB16392D652";
                return res;
            }
            else if (value.Name == nameof(ObjectValue))
            {
                return new JObject();
            }
            else
            {
                throw new Exception($"unexpected value {value.Name}");
            }
        }
    }

    public class EntityChanges
    {
        // in order
        public OperationSplit[] Operations { get; set; }
        public string ChangeId { get; set; }

        internal EntityChanges Clone()
        {
            return new EntityChanges
            {
                Operations = this.Operations.Select(x => x.Clone()).ToArray(),
                ChangeId = this.ChangeId
            };
        }
    }

    public class ValueSplit
    {
        public string Name { get; set; }
        public string JSON { get; set; }
    }

    public class StringValue
    {
        public string Value { get; set; }
    }

    public class NumberValue
    {
        public double Value { get; set; }
    }

    public class SetValue
    {
        // is empty
    }

    public class ObjectValue
    {
        // is empty
    }

    public class OperationSplit
    {
        public string Name { get; set; }
        public string JSON { get; set; }

        internal OperationSplit Clone()
        {
            return new OperationSplit
            {
                Name = this.Name,
                JSON = this.JSON,
            };
        }
    }

    public class AddOrSetOperation
    {
        public string[] Path { get; set; }
        public ValueSplit Value { get; set; }
    }

    //public class DeleteOperation
    //{
    //    public string[] Path { get; set; }
    //}

    public class AddToSetOperation
    {
        public string[] Path { get; set; }
        public ValueSplit Value { get; set; }
    }
    public class RemoveFromSetOperation
    {
        public string[] Path { get; set; }
    }
    public class ClearSetOperation
    {
        public string[] Path { get; set; }
    }
    public class AddToNumberOperation
    {
        public string[] Path { get; set; }
        public double Add { get; set; }
    }

    public class UpdateCollaborativeString
    {
        public string[] Path { get; set; }
        public CollaborativeChange[] Changes { get; set; }
        public string FromChangeId { get; set; }
    }

    public class CollaborativeChange
    {
        public string Type { get; set; }
        public int AtIndex { get; set; }
        public string Text { get; set; }
    }

}