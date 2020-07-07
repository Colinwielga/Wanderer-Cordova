g.SharedEntity = {};

g.SharedEntity.MakeTrackedEntity = function (key1, key2) {

    var res = {
        GetEntityChanges: function () {
            var res = [];
            for (var item of this.changeList) {
                res.push(item);
            }
            return { Operations: res, ChangeId: Math.floor(Math.random() * 1000000) + "" };
        },
        key1: key1,
        key2: key2,
        changeList: [],
        MakePath: function (path, string) {
            var res = [];
            for (var item of path) {
                res.push(item);
            }
            res.push(string);
            return res;
        },
        waitFor: null,
        lastSend: 0,
        PossiblyUpdateTrackedEntity: function (payload, key1,key2) {
            // we are not waiting
            if (this.waitFor === null) {
                return g.SharedEntity.ToTrackedEntity(payload.JObject,key1,key2);
            }

            // try have what we are waiting for
            var waitFor = this.waitFor;
            if (payload.RecentChanges.find(item => { return item === waitFor })) {
                return g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2);
            }

            // we have been waiting a long time
            if ((new Date().getTime() - this.lastSend) > 10*1000) {
                return g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2);
            }

            return this.root;
        },
        Publish: function () {
            var thing = this.GetEntityChanges();
            g.services.SignalRService.connection.send('UpdateSharedEntity', key1, key2, thing);
            changeList = [];
            this.waitFor = thing.ChangeId;    
            if (this.lastSend === 0) {
                var d = new Date();
                this.lastSend = d.getTime();

            }
        }
    };

    res.MakeNumber = function (path, number) {
        return {
            entityChanges: res,
            backing: number,
            path: path,
            FromTracked: function () {
                return this.backing;
            },
            ToValue: function () {
                return {
                    Name: "NumberValue",
                    JSON: JSON.stringify({
                        Value: number
                    })
                };
            },
            Set: function (number) {
                this.backing = number;
                this.entityChanges.changeList.push({
                    Name: "AddOrSetOperation",
                    JSON: JSON.stringify({
                        Path: this.path,
                        Value: this.ToValue()
                    })
                });
            },
            Add: function (number) {
                this.backing += number;
                this.entityChanges.changeList.push({
                    Name: "AddToNumberOperation",
                    JSON: JSON.stringify({
                        Path: this.path,
                        Number: number
                    })
                });
            }
        };
    };
    res.MakeString = function (path, string) {
        return {
            entityChanges: res,
            backing: string,
            path: path,
            FromTracked: function () {
                return this.backing;
            },
            ToValue: function () {
                return {
                    Name: "StringValue",
                    JSON: JSON.stringify({
                        Value: string
                    })
                };
            },
            Set: function (string) {
                this.backing = string;
                this.entityChanges.changeList.push({
                    Name: "AddOrSetOperation",
                    JSON: JSON.stringify({
                        Path: this.path,
                        Value: this.ToValue()
                    })
                });
            }
        };
    };
    // list is really a set
    res.MakeList = function (path) {
        return {
            entityChanges: res,
            backing: [],
            path: path,
            FromTracked: function () {
                var res = [];

                for (var item of this.backing) {
                    res.push(item.FromTracked());
                }

                return res;
            },
            ToValue: function () {
                return {
                    Name: "ListValue",
                    JSON: JSON.stringify({})
                };
            },
            Clear: function () {
                this.backing = [];
                this.entityChanges.changeList.push({
                    Name: "ClearListOperation",
                    JSON: JSON.stringify({
                        Path: this.path
                    })
                });
            },
            AppendShared: function (added) {
                this.backing.push(added);
                this.entityChanges.changeList.push({
                    Name: "AppendToListOperation",
                    JSON: JSON.stringify({
                        Path: this.path,
                        Value: added.ToValue()
                    })
                });
                return added;
            },
            AppendString: function (string) {
                var added = this.entityChanges.MakeString(this.entityChanges.MakePath(this.path, this.backing.length + ""), string);
                return this.AppendShared(added);
            },
            AppendNumber: function (number) {
                var added = this.entityChanges.MakeNumber(this.entityChanges.MakePath(this.path, this.backing.length + ""), number);
                return this.AppendShared(added);
            },
            AppendList: function () {
                var added = this.entityChanges.MakeList(this.entityChanges.MakePath(this.path, this.backing.length + ""));
                return this.AppendShared(added);
            },
            AppendObject: function () {
                var added = this.entityChanges.MakeObject(this.entityChanges.MakePath(this.path, this.backing.length + ""));
                return this.AppendShared(added);
            }
        };
    };
    res.MakeObject = function (path) {
        return {
            entityChanges: res,
            backing: {},
            path: path,
            FromTracked: function () {
                var res = {};

                for (var key in this.backing) {
                    res[key] = this.backing[key].FromTracked();
                }

                return res;
            },
            ToValue: function () {
                return {
                    Name: "ObjectValue",
                    JSON: JSON.stringify({})
                };
            },
            SetShared: function (member, added) {
                this.backing[member] = added;
                this.entityChanges.changeList.push({
                    Name: "AddOrSetOperation",
                    JSON: JSON.stringify({
                        Path: this.entityChanges.MakePath(this.path, member),
                        Value: added.ToValue()
                    })
                });
                var that = this;
                added.Delete = function () {
                    delete that.backing[member];
                };
                return added;
            },
            SetString: function (member, string) {
                var added = this.entityChanges.MakeString(this.entityChanges.MakePath(this.path, member), string);
                return this.SetShared(member, added);
            },
            SetNumber: function (member, number) {
                var added = this.entityChanges.MakeNumber(this.entityChanges.MakePath(this.path, member), number);
                return this.SetShared(member, added);
            },
            SetList: function (member) {
                var added = this.entityChanges.MakeList(this.entityChanges.MakePath(this.path, member));
                return this.SetShared(member, added);
            },
            SetObject: function (member) {
                var added = this.entityChanges.MakeObject(this.entityChanges.MakePath(this.path, member));
                return this.SetShared(member, added);
            }
        };
    };

    res.root = res.MakeObject([]);
    return res.root;
};

g.SharedEntity.ToTrackedEntity = function (obj,key1,key2) {
    var res = g.SharedEntity.CopyMembers(obj, g.SharedEntity.MakeTrackedEntity(key1, key2));
    res.entityChanges.changeList = [];
    return res;
};

g.SharedEntity.CopyMembers = function (fromObject, toObject) {
    for (var member in fromObject) {
        if (typeof fromObject[member] === "number") {
            toObject.SetNumber(member, fromObject[member]);
        }
        if (typeof fromObject[member] === "string") {
            toObject.SetString(member, fromObject[member]);
        }
        if (Array.isArray(fromObject[member])) {
            var newList = toObject.SetList(member);
            g.SharedEntity.CopyElements(fromObject[member], newList);
        }
        if (typeof fromObject[member] === "object") {
            var newObject = toObject.SetObject(member);
            g.SharedEntity.CopyMembers(fromObject[member], newObject);
        }
    }
    return toObject;
};

g.SharedEntity.CopyElements = function (fromList, toList) {
    for (var item of fromList) {
        if (typeof item === "number") {
            toList.AppendNumber(item);
        }
        if (typeof item === "string") {
            toList.AppendString(item);
        }
        if (Array.isArray(item)) {
            var newList = toList.AppendList();
            g.SharedEntity.CopyElements(item, newList);
        }
        if (typeof item === "object") {
            var newObject = toList.AppendObject();
            g.SharedEntity.CopyMembers(item, newObject);
        }
    }
    return toList;
};

//var test = g.SharedEntity.ToTrackedEntity({
//    w: "test",
//    x: 5,
//    y: [1, 2, 3],
//    z: {
//        a: {
//            aa: 10
//        }
//    }
//})

// tests 
//console.log("result:", test)

//var testList = test.SetList("v");
//testList.AppendNumber(1);
//testList.AppendNumber(2);
//testList.AppendNumber(3);

//console.log("result:", test.entityChanges.GetEntityChanges());
//console.log("result:", test.FromTracked());