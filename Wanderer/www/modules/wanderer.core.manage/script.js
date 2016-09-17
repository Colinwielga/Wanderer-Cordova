var component = function () {
    //window.localStorage.clear();
    var that = this;
    // we load the character
    that.characterList = [];
    var charactorListString = window.localStorage.getItem("charactorlist");
    if (charactorListString !== undefined && charactorListString !== null) {
        that.characterList = JSON.parse(charactorListString);
    }

    that.getId = function () {
        return "wanderer.core.manage"
    }
    that.OnStart = function (communicator, dependencies) {
        that.communicator = communicator;
        // that.description = dependencies[0];
    }
    that.OnNewCharacter = function () {
        var d = new Date();
        //that.id = d.getTime();
        that.saveAs = "untitled " + d.toString();
    }
    that.OnSave = function () {
        //this.communicator.write("id", that.id);
        this.communicator.write("saveAs", that.saveAs);
    }
    that.OnLoad = function () {
        //if (that.communicator.canRead("id")) {
        //    that.id = that.communicator.read("id");
        //} else {
        //    var d = new Date();
        //    that.id = d.getTime();
        //}
        if (that.communicator.canRead("saveAs")) {
            that.saveAs = that.communicator.read("saveAs");
        } else {
            var d = new Date();
            that.saveAs = "untitled " + d.toString();
        }
    }
    that.OnUpdate = function () {
        //that.save();
    }
    that.getHmtl = function () {
        return "modules/" + that.getId() + "/page.html"
    }
    that.getTitle = function () {
        return "Manage";
    }
    that.getRequires = function () {
        return [];//"colin.wielga.description"
    }
    that.getPublic = function () {
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            },
            comFactory: function (item) {
                return {
                    read: function (key) {
                        return that.charactor[item.getId()][key];
                    }, canRead: function (key) {
                        return that.charactor[item.getId()] !== undefined && that.charactor[item.getId()][key] !== undefined;
                    }, write: function (key, value) {
                        if (that.charactor[item.getId()] === undefined) {
                            that.charactor[item.getId()] = {};
                        }
                        that.charactor[item.getId()][key] = value;
                    }
                };
            }, loadLastCharacter: function () {
                if (that.characterList.length > 0) {
                    that.Load(that.characterList[that.characterList.length - 1]);
                } else {
                    that.newCharacter();
                }
            }
        }
    }
    that.getCharName = function (id) {
        try {
            var json = window.localStorage.getItem(id);
            var tempChar = JSON.parse(json);
            return tempChar["wanderer.core.manage"].saveAs;
        } catch (e) {
            return "unknow file name";
        }
    }

    that.newCharacter = function (shouldSave) {

        that.charactor = {};
        g.Wanderer.components.forEach(function (item) {
            if (item.OnNewCharacter !== undefined) {
                try {
                    item.OnNewCharacter();
                } catch (e) {
                }
            }
        });
    }

    that.Load = function (charName) {
        //TODO handle bad names


        // we load the last character used
        var last = window.localStorage.getItem(charName);//undefined;//
        var tempChar = undefined;
        if (last !== undefined) {
            tempChar = JSON.parse(last);
        }

        // we generate a default character
        that.charactor = tempChar;//that.newCharacter();

        g.Wanderer.components.forEach(function (item) {
            if (item.OnLoad !== undefined) {
                try {
                    item.OnLoad();
                } catch (e) {
                }
            }
        });
    }

    that.Delete = function (charId) {
        // we delete the char
        var last = window.localStorage.removeItem(charId);
         
        // we also delete it from the list of recent characters
        var charactorListString = window.localStorage.getItem("charactorlist");
        if (charactorListString != undefined) {
            that.characterList = JSON.parse(charactorListString);
        } else {
            that.characterList = [];
        }
        var characterIndex = that.characterList.indexOf(charId);
        if (characterIndex !== -1) {
            that.characterList.splice(characterIndex, 1);
        }
        charactorListString = JSON.stringify(that.characterList);
        window.localStorage.setItem("charactorlist", charactorListString);

        // then we create a new character
        that.newCharacter(false);
    }

    that.save = function () {

        g.Wanderer.components.forEach(function (item) {
            if (item.OnSave !== undefined) {
                try {
                    item.OnSave();
                } catch (e) {
                }
            }
        });

        //we make sure your character is at the end of the charactorlist
        var charactorListString = window.localStorage.getItem("charactorlist");
        if (charactorListString != undefined) {
            that.characterList = JSON.parse(charactorListString);
        } else {
            that.characterList = [];
        }

        var characterIndex = that.characterList.indexOf(that.saveAs);
        if (characterIndex !== -1) {
            that.characterList.splice(characterIndex, 1);
        }
        that.characterList.push(that.saveAs);
        charactorListString = JSON.stringify(that.characterList);
        window.localStorage.setItem("charactorlist", charactorListString);


        // save your character
        var output = JSON.stringify(that.charactor);
        window.localStorage.setItem(that.saveAs, output);

        //setTimeout(function () {
        //    save();
        //}
        //, 1000);
    }
    that.OnNewCharacter();
}

g.Wanderer.register(component);