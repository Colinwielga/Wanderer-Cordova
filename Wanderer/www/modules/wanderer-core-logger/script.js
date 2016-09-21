

var component = function () {
    this.log = [];


    this.getId = function () {
        return "wanderer-core-logger"
    }

    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {}
    this.OnSave = function () {}
    this.OnLoad = function () {}
    this.OnUpdate = function () {}

    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        var that = this;
        return {
            getDescription: function () {
                return "Handles logging";
            },
            getVersion: function () {
                return 1;
            },
            writeToLog: function (str) {
                that.log.push(str);
            }
        }
    }

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Log";
    }

    this.OnNewCharacter();
}

g.ComponentManager.register(component);