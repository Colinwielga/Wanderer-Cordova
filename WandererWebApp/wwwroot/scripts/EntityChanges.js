﻿g.SharedEntity = {};

g.SharedEntity.uuidv4 = function() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

g.SharedEntity.MakeTrackedEntity = function (key1, key2) {

    var res = {
        GetEntityChanges: function () {
            var res = [];
            for (var item of this.changeList) {
                res.push(item);
            }
            return { Operations: res, ChangeId: g.SharedEntity.uuidv4() };
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
            var changes = this.GetEntityChanges();
            g.services.SignalRService.connection.send('UpdateSharedEntity', key1, key2, changes);
            changeList = [];
            this.waitFor = changes.ChangeId;    
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
                        Add: number
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
    res.MakeSet = function (path) {
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
                    Name: "SetValue",
                    JSON: JSON.stringify({})
                };
            },
            Clear: function () {
                this.backing = [];
                this.entityChanges.changeList.push({
                    Name: "ClearSetOperation",
                    JSON: JSON.stringify({
                        Path: this.path
                    })
                });
            },
            AddShared: function (added,id) {
                this.backing.push(added);
                this.entityChanges.changeList.push({
                    Name: "AddToSetOperation",
                    JSON: JSON.stringify({
                        Path: this.entityChanges.MakePath(this.path, id),
                        Id: id,
                        Value: added.ToValue()
                    })
                });
                // this fields very weird to me
                // have object of verying shape
                // but I bet it is ok in javascript world
                added.id = id;
                return added;
            },
            AddStringWithId: function (id,string) {
                var added = this.entityChanges.MakeString(this.entityChanges.MakePath(this.path, id), string);
                return this.AddShared(added, id);
            },
            AddNumberWithId: function (id,number) {
                var added = this.entityChanges.MakeNumber(this.entityChanges.MakePath(this.path, id), number);
                return this.AddShared(added, id);
            },
            AddSetWithId: function (id) {
                var added = this.entityChanges.MakeSet(this.entityChanges.MakePath(this.path, id));
                return this.AddShared(added, id);
            },
            AddObjectWithId: function (id) {
                var added = this.entityChanges.MakeObject(this.entityChanges.MakePath(this.path, id));
                return this.AddShared(added, id);
            },
            AddString: function (string) {
                var id = g.SharedEntity.uuidv4();
                return this.AddStringWithId(id, string);
            },
            AddNumber: function (number) {
                var id = g.SharedEntity.uuidv4();
                return this.AddNumberWithId(id, number);
            },
            AddSet: function () {
                var id = g.SharedEntity.uuidv4();
                return this.AddSetWithId(id);
            },
            AddObject: function () {
                var id = g.SharedEntity.uuidv4();
                return this.AddObjectWithId(id);
            },
            Remove: function (id) {
                var index = -1
                for (var i = 0; i < this.backing.length; i++) {
                    if (this.backing[i].id === id) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    throw { message: "idem not found" };
                }
                this.backing.splice(index, 1)
                this.entityChanges.changeList.push({
                    Name: "RemoveFromSetOperation",
                    JSON: JSON.stringify({
                        Path: this.entityChanges.MakePath(this.path, id),
                    })
                });
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
            SetSet: function (member) {
                var added = this.entityChanges.MakeSet(this.entityChanges.MakePath(this.path, member));
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
        // TODO
        // and what if fromObject[member] is null? how will we know what type it is?
        if (typeof fromObject[member] === "number") {
            toObject.SetNumber(member, fromObject[member]);
        }
        else if (typeof fromObject[member] === "string") {
            toObject.SetString(member, fromObject[member]);
        }
        else if (typeof fromObject[member] === "object" && fromObject[member]["is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652"] === "true-35EF2BBB-D1CA-4E64-BC28-7CB16392D652" ) {
            var newSet = toObject.SetSet(member);
            g.SharedEntity.CopyElements(fromObject[member], newSet);
        }
        else if (typeof fromObject[member] === "object") {
            var newObject = toObject.SetObject(member);
            g.SharedEntity.CopyMembers(fromObject[member], newObject);
        }
    }
    return toObject;
};

g.SharedEntity.CopyElements = function (fromSet, toSet) {
    for (var member in fromSet) {
        if (member === "is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652") {
            // we don't track the special magic set member on the JS side
        }
        else if (typeof fromSet[member] === "number") {
            toSet.AddNumberWithId(member,fromSet[member]);
        }
        else if (typeof fromSet[member] === "string") {
            toSet.AddStringWithId(member,fromSet[member]);
        }
        else if (typeof fromSet[member] === "object" && fromSet[member]["is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652"] === "true-35EF2BBB-D1CA-4E64-BC28-7CB16392D652") {
            var newSet = toSet.AddSetWithId(member);
            g.SharedEntity.CopyElements(fromSet[member], newSet);
        }
        else if (typeof fromSet[member] === "object") {
            var newObject = toSet.AddObjectWithId(member);
            g.SharedEntity.CopyMembers(fromSet[member], newObject);
        }
    }
    return toSet;
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

//var testSet = test.SetSet("v");
//testSet.AddNumber(1);
//testSet.AddNumber(2);
//testSet.AddNumber(3);

//console.log("result:", test.entityChanges.GetEntityChanges());
//console.log("result:", test.FromTracked());