

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

    this.getRequires = function () {
        return [];
    }


    this.getPublic = function () {
        var that = this;
        return {
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
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Log";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(component);