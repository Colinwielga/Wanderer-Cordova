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
        return "wanderer-core-manage"
    }
    that.OnStart = function (communicator, dependencies) {
        that.communicator = communicator;
        that.JSONEditor = dependencies[0];
    }
    that.OnNewCharacter = function () {
        var d = new Date();
        that.saveAs = "untitled " + d.getDate();
    }
    that.OnSave = function () {
        this.communicator.write("saveAs", that.saveAs);
    }
    that.OnLoad = function () {
        if (that.communicator.canRead("saveAs")) {
            that.saveAs = that.communicator.read("saveAs");
        } else {
            var d = new Date();
            that.saveAs = "untitled " + d.getDate();
        }
    }
    that.OnUpdate = function () {
        //that.save();
    }

    this.getRequires = function () {
        return ["wanderer-core-json-editor"];
    }

    that.getHmtl = function () {
        return "modules/" + that.getId() + "/page.html"
    }
    that.getTitle = function () {
        return "Manage";
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
            },
            loadLastCharacter: function () {
                if (that.characterList.length > 0) {
                    that.Load(that.characterList[that.characterList.length - 1]);
                } else {
                    that.newCharacter();
                }
            },
            saveJson: function (saveTo,json) {
                try {
                    var charactorListString = window.localStorage.getItem("charactorlist");
                    if (charactorListString != undefined) {
                        that.characterList = JSON.parse(charactorListString);
                    } else {
                        that.characterList = [];
                    }

                    var characterIndex = that.characterList.indexOf(saveTo);
                    if (characterIndex !== -1) {
                        that.characterList.splice(characterIndex, 1);
                    }
                    that.characterList.push(saveTo);
                    charactorListString = JSON.stringify(that.characterList);
                    window.localStorage.setItem("charactorlist", charactorListString);

                    // save your character
                    window.localStorage.setItem(saveTo, json);

                    that.Load(saveTo);

                } catch (e) {}
            },
            getJSON: function () {
                return JSON.stringify(that.charactor);
            }
        }
    }
    that.getCharName = function (id) {
        try {
            var json = window.localStorage.getItem(id);
            //var tempChar = JSON.parse(json);
            return id;//tempChar[that.getId()].saveAs;
        } catch (e) {
            return "unknow file name";
        }
    }

    that.newCharacter = function () {
        that.charactor = {};
        g.ComponentManager.components.forEach(function (item) {
            if (item.OnNewCharacter !== undefined) {
                try {
                    item.OnNewCharacter();
                } catch (e) {
                }
            }
        });

        // update json
        that.JSONEditor.updateJson(JSON.stringify(that.charactor))
    }

    that.Load = function (charName) {
        //TODO handle bad names

        that.saveAs = charName;

        // we load the last character used
        var last = window.localStorage.getItem(charName);//undefined;//
        var tempChar = {};
        if (last !== undefined && last !== null) {
            tempChar = JSON.parse(last);
        }

        // we generate a default character
        that.charactor = tempChar;//that.newCharacter();

        g.ComponentManager.components.forEach(function (item) {
            if (item.OnLoad !== undefined) {
                try {
                    item.OnLoad();
                } catch (e) {
                }
            }
        });

        that.JSONEditor.updateJson(JSON.stringify(that.charactor))
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
        that.newCharacter();
    }

    that.save = function () {

        g.ComponentManager.components.forEach(function (item) {
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

        // update json:
        that.JSONEditor.updateJson(JSON.stringify(that.charactor))

        // save your character
        var output = JSON.stringify(that.charactor);
        window.localStorage.setItem(that.saveAs, output);

    }


    that.OnNewCharacter();
}

g.ComponentManager.register(component);