g.SharedEntity = {};

g.SharedEntity.CompareStrings = function(from, to){
    // abd
    // acd
    // list of lists of lists of strings ("↘","➡","⬇")
    // columns then row
    // each entry is 
    // [[[],["⬇"],["⬇","⬇"],["⬇","⬇","⬇"]],
    //  [["➡"],["↘"],["↘","⬇"],["↘","⬇","⬇"]],
    //  [["➡", "➡"],["↘", "➡"],["↘","⬇","➡"],["↘","⬇","⬇","➡"]],
    //  [["➡", "➡", "➡"],["↘","➡","➡"],["↘","⬇","➡","➡"],["↘","⬇","➡","↘"]],
    //  ]
    //
    //_     ➡  ➡➡   ➡➡➡
    // a ⬇   ↘  ↘➡    ↘➡➡
    // c ⬇⬇  ↘⬇ ↘⬇➡   ↘⬇➡➡
    // d ⬇⬇⬇ ↘⬇⬇ ↘⬇⬇➡ ↘⬇➡↘

    // accessed like: grid[x][y]

    var copyAndAppend = function(list,toAdd){
        var res = [];
        for (var item of list){
            res.push(item);
        }
        res.push(toAdd);
        return res;
    }

    // create the grid
    var grid = [];
    // create the columns
    for (var x=0; x <= from.length; x++){
        // create a column
        var columnToAdd = [];
        // for each row
        for (var y=0; y <= to.length; y++){
            var rowToAdd = null;
            // add our new row to our column
            columnToAdd.push(rowToAdd);
        }
        // add our new column to our gird
        grid.push(columnToAdd);
    }

    // fill the grid:
    //  working left to right, top to bottom look at each square:
    for (var x=0; x <= from.length; x++){
        for (var y=0; y <= to.length; y++){
            //  calculate the 3 possible paths to that square
            var bestPath = null;
            // 1st path the square above plus "⬇"
            if (y != 0) { 
                var path1 = copyAndAppend(grid[x][y-1], "⬇");
                // we are the best path 
                bestPath = path1;
            }
            // the square diagonal plus "↘" when the letters match
            if (y != 0 && x != 0 && from[x-1] === to[y-1]){
                var path2 = copyAndAppend(grid[x-1][y-1], "↘")
                // is the best path empty? if so, we are the best path
                // otherwise, are we shorter than the path? if so we are the best
                if (bestPath === null){
                    bestPath = path2;
                }
                else if (path2.length < bestPath.length){
                    bestPath = path2;
                }
            }
            // the square to the left plus "➡"
            if (x != 0) {
                var path3 = copyAndAppend(grid[x-1][y], "➡")
                // is the best path empty? if so, we are the best path
                // otherwise, are we shorter than the path? if so we are the best
                if (bestPath === null){
                    bestPath = path3;
                }
                else if (path3.length < bestPath.length){
                    bestPath = path3;
                }
            }
            // the square is 0,0 use the empty list
            if (y === 0 && x === 0) {
                var path4 = []
                // is the best path empty? if so, we are the best path
                // otherwise, are we shorter than the path? if so we are the best
                if (bestPath === null){
                    bestPath = path4;
                }
                else if (path4.length < bestPath.length){
                    bestPath = path4;
                }
            }
            //  fill the square with the best path
            grid[x][y] = bestPath;
        }
    }

    //   _   a   b      d
    // _     ➡  ➡➡   ➡➡➡
    // a ⬇   ↘  ↘➡    ↘➡➡
    // c ⬇⬇  ↘⬇ ↘⬇➡   ↘⬇➡➡
    // d ⬇⬇⬇ ↘⬇⬇ ↘⬇⬇➡ ↘⬇➡↘


    // abc
    // acd

    // ↘ moves both
    // ➡ moves only orginal
    // ⬇ moves only new

    // ↘
    // a     0
    // a     0
    // res: []

    // ↘➡
    // ab     1
    // a      0
    // res: [{type:"delete", atIndex: 1, text: "b" }]

    // ↘➡↘
    // abc    2 
    // ac     1
    // res: [{type:"delete", atIndex: 1, text: "b" }]

    // ↘➡↘⬇
    // abc   2
    // acd   2 
    // res: [{type:"delete", atIndex: 1, text: "b" }, {type:"add", atIndex:2, text:"d"}]

    
    var bestPath = grid[from.length][to.length];


    var changes = [];
    var fromIndex = -1;
    var toIndex = -1;
    for (var arrow of bestPath){
        if (arrow === "↘"){
            fromIndex = fromIndex + 1;
            toIndex = toIndex + 1;
        } 
        else if (arrow === "➡"){
            fromIndex = fromIndex + 1;
            changes.push({type:"delete", atIndex: toIndex + 1, text: from[fromIndex]});
        }
        else if (arrow === "⬇"){
            toIndex = toIndex + 1;
            changes.push({type:"add", atIndex: toIndex, text: to[toIndex]});   
        }
    }

    // test with 
    // abc => dog
    // right now it is:
    // var changes = [
    //   { type: "delete", atIndex: 0, text: "a" },
    //   { type: "delete", atIndex: 0, text: "b" },
    //   { type: "delete", atIndex: 0, text: "c" },
    //   { type: "add", atIndex: 0, text: "d" }
    //   { type: "add", atIndex: 1, text: "o" }
    //   { type: "add", atIndex: 2, text: "g" }
    // ]
    // var flattenedChanges = [
    //   { type: "delete", atIndex: 0, text: "abc" },
    //   { type: "add", atIndex: 0, text: "dog" }
    // ]

    // we are going to have a concept of last set it to null
    // create flattenedChanges as an empty list
    var last = null;
    var flattenedChanges = [];
    // we are going to loop through changes
    for (var current of changes){
        // on each change:
        //  if there is a last (aka last is not null)
        //  do the code we wrote
        //  update last to be current
        if (last != null){
            // try combine deletes and set last to the result
            if (current.type === last.type && current.type === "delete" && current.atIndex === last.atIndex){
                last = {type:"delete", atIndex: current.atIndex, text: last.text + current.text};
            }
            // otherwise try combine adds and set last to the result
            else if (current.type === last.type && current.type === "add" && current.atIndex === last.atIndex + last.text.length){
                last = {type:"add", atIndex: last.atIndex, text: last.text + current.text}
            }
            // otherwise push to flattenedChanges
            else {
                flattenedChanges.push(last);
                last = current;
            }
        }
        else {
            last = current;
        }
    }

    if (last != null){
        flattenedChanges.push(last);
    }

    return flattenedChanges;
}

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
            if (changes.Operations.length != 0 ){
                console.log("sending changes",changes.Operations);
                g.services.SignalRService.connection.send('UpdateSharedEntity', key1, key2, changes);
                this.changeList = [];
                this.waitFor = changes.ChangeId;    
                if (this.lastSend === 0) {
                    var d = new Date();
                    this.lastSend = d.getTime();

                }
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
                        Value: this.backing
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
                        Value: this.backing 
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
            },
            UpdateForCollaboration: function (newString) {

                var from = this.backing;
                var to = newString;

                var flattenedChanges = g.SharedEntity.CompareStrings(from, to);

                this.entityChanges.changeList.push({
                    Name: "UpdateCollaborativeString",
                    JSON: JSON.stringify({
                        Path: this.path,
                        Changes: flattenedChanges,
                        Original: from,
                    })
                });
                this.backing = newString;

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
                    throw { message: "item not found" };
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
            // ,
            // UpdateCollaborativeString: function (member, string) {
            //     var added = this.entityChanges.MakeString(this.entityChanges.MakePath(this.path, member), string);
            //     return this.SetShared(member, added);
            // },
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
        else if (typeof fromObject[member] === "object" && fromObject[member] != null && fromObject[member]["is-set-35EF2BBB-D1CA-4E64-BC28-7CB16392D652"] === "true-35EF2BBB-D1CA-4E64-BC28-7CB16392D652" ) {
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