// TODO this is badly designed
// I should not be saving so much info about gods
var component = function () {

    this.getId = function () {
        return "colin-wielga-gods"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.gods = God.generateGods();
    }
    this.OnSave = function () {
        this.communicator.write("gods", this.gods);
    }
    this.OnLoad = function () {
        if (this.communicator.lastVersion() === -1) {
            if (this.communicator.canRead("gods")) {
                this.gods = JSON.parse(this.communicator.read("gods"));
            } else {
                this.OnNewCharacter();
            }
        }else if (this.communicator.lastVersion() === this.getPublic().getVersion()) {
            if (this.communicator.canRead("gods")) {
                this.gods = this.communicator.read("gods");
            } else {
                this.OnNewCharacter();
            }
        }
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Gods";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1.1;
            },
            getGods: function () {
                return that.gods;
            }
        }
    }
    this.OnNewCharacter();
}

g.ComponetRegistry.register(component);