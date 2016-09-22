// Colin you have seperation in name only here 
// this is all tangled up with Wander-core-manage
// that is pushing changes to us

var component = function () {
    var that = this;
    that.json = {};
    that.saveAs = "";

    this.getId = function () {
        return "wanderer-core-json-editor"
    }

    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
        this.manage = dependencies[0]
    }
    this.OnNewCharacter = function () {}
    this.OnSave = function () {}
    this.OnLoad = function () {}
    this.OnUpdate = function () {}

    this.getRequires = function () {
        return ["wanderer-core-manage"];
    }

    this.getPublic = function () {
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            },
            updateJson:function (newJson) {
                that.json = newJson;
            }
        }
    }

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "JSON Editor";
    }
    this.saveJSON = function () {
        that.manage.saveJson(that.saveAs, that.json);
    }
    this.refreshJSON = function () {
        that.getPublic().updateJson(that.manage.getJSON());
    }
}

g.ComponentManager.register(component);