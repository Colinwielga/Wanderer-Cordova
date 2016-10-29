// Colin you have seperation in name only here 
// this is all tangled up with Wander-core-manage
// that is pushing changes to us

var component = function () {
    var that = this;
    that.json = "";
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

    this.getRequires = function () {
        return ["wanderer-core-manage"];
    }

    this.getPublic = function () {
        return {
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
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "JSON Editor";
    }
    this.saveJson = function () {
        that.manage.saveJson(that.saveAs, that.json);
    }
    this.refreshJson= function () {
        that.getPublic().updateJson(JSON.stringify(that.manage.getJSON()));
    }
}

g.ComponentManager.register(component);