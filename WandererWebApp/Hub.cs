
using Microsoft.AspNetCore.SignalR;
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
        private readonly ItemCache cache;

        public Chat(ItemCache cache)
        {
            this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        public void JoinGame(string groupName)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, groupPrefix + groupName);
        }

        public void BroadcastMessage(string groupName, object message)
        {
            Clients.Groups(groupPrefix + groupName).SendAsync("BroadcastMessage", groupName, message);
        }


        public async Task RequestEntity(string key1, string key2) {
            if (key1.Contains("|")) {
                throw new Exception($"invalid key: \"{key1}\", key cannot contain \"|\"");
            }
            if (key2.Contains("|"))
            {
                throw new Exception($"invalid key: \"{key2}\", key cannot contain \"|\"");
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, key1 +"|" + key2);

            var jsonString = await cache.Get(key1, key2);

            await Clients.Client(Context.ConnectionId).SendAsync("EntityState", key1,key2, jsonString);
        }

        public async Task UpdateSharedEntity(string key1, string key2, EntityChanges entityChanges) {

            var jsonString = await cache.Do(key1, key2, entity =>
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
                    if (item.Name == nameof(DeleteOperation))
                    {
                        var deleteOperation = JsonConvert.DeserializeObject<DeleteOperation>(item.JSON);
                        var at = entity;
                        foreach (var pathPart in deleteOperation.Path.SkipLast(1))
                        {
                            at =Navigate(at, pathPart);
                        }
                        at.Remove(deleteOperation.Path.Last());
                    }
                    else if (item.Name == nameof(AddToSetOperation))
                    {
                        var append = JsonConvert.DeserializeObject<AddToSetOperation>(item.JSON);
                        var at = entity; ;
                        foreach (var pathPart in append.Path)
                        {
                            at =Navigate(at, pathPart);
                        }
                        at[append.Id] = ToValue(append.Value);
                    }
                    else if (item.Name == nameof(RemoveFromSetOperation))
                    {
                        var removeFromSet = JsonConvert.DeserializeObject<RemoveFromSetOperation>(item.JSON);
                        var at = entity; ;
                        foreach (var pathPart in removeFromSet.Path)
                        {
                            at = Navigate(at, pathPart);
                        }
                        at.Remove(removeFromSet.Id.ToString());
                    }
                    else if (item.Name == nameof(ClearSetOperation))
                    {
                        var clear = JsonConvert.DeserializeObject<ClearSetOperation>(item.JSON);
                        var at = entity; ;
                        foreach (var pathPart in clear.Path.SkipLast(1))
                        {
                            at =Navigate(at, pathPart);
                        }
                        at[clear.Path.Last()] = new JObject();
                    }
                    else if (item.Name == nameof(AddToNumberOperation))
                    {
                        var addToNumber = JsonConvert.DeserializeObject<AddToNumberOperation>(item.JSON);
                        var at = entity; ;
                        foreach (var pathPart in addToNumber.Path.SkipLast(1))
                        {
                            at =Navigate(at, pathPart);
                        }
                        at[addToNumber.Path.Last()] = ((double)at[addToNumber.Path.Last()]) + addToNumber.Add;
                    }
                    else
                    {
                        throw new Exception($"unexpected operation {item.Name}");
                    }
                }
                return entity;
            }, entityChanges.ChangeId);

            await Clients.Groups(key1 + "|" + key2).SendAsync("EntityUpdate", key1, key2, jsonString);
        }

        private static JObject Navigate(JObject x, string pathPart)
        {
            var thing = x[pathPart];
            if (thing is JObject jObject)
            {
                return jObject;
            }
            throw new Exception($"unexpected type of thing {thing.GetType()}");
        }

        private JToken ToValue(ValueSplit value)
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
            else if (value.Name == nameof(ListValue))
            {
                return new JObject();
            }
            else if (value.Name == nameof(ObjectValue))
            {
                return new JObject();
            }
            else {
                throw new Exception($"unexpected value {value.Name}");
            }
        }
    }

    public class EntityChanges {
        // in order
        public OperationSplit[] Operations;
        public string ChangeId;
    }

    public class ValueSplit
    {
        public string Name;
        public string JSON;
    }

    public class StringValue {
        public string Value;
    }

    public class NumberValue
    {
        public double Value;
    }

    public class ListValue
    {
        // is empty
    }

    public class ObjectValue
    {
        // is empty
    }

    public class OperationSplit {
        public string Name;
        public string JSON;
    }

    public class AddOrSetOperation {
        public string[] Path;
        public ValueSplit Value; 
    }

    public class DeleteOperation
    {
        public string[] Path;
    }

    public class AddToSetOperation
    {
        public string[] Path;
        public Guid Id;
        public ValueSplit Value;
    }
    public class RemoveFromSetOperation
    {
        public string[] Path;
        public Guid Id;
    }
    public class ClearSetOperation
    {
        public string[] Path;
    }
    public class AddToNumberOperation {
        public string[] Path;
        public double Add;
    }
}