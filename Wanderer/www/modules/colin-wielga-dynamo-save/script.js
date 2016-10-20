ColinWielgaDyanmo.component = function () {

    // all component need a unique ID
    this.getId = function () {
        return "colin-wielga-dynamo-save"
    }


    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
        this.manage = dependencies[0]
    }
    this.OnNewCharacter = function () { }
    this.OnSave = function () { }
    this.OnLoad = function () { }
    this.OnUpdate = function () { }
    this.getRequires = function () {
        return ["wanderer-core-manage"];
    }

    this.OnUpdate = function () {
    }

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
        return ["wanderer-core-manage"];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            updateJson: function (newJson) {
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
    this.refreshJSON = function () {
        that.getPublic().updateJson(that.manage.getJSON());
    }
}

g.ComponentManager.register(ColinWielgaDyanmo.component);