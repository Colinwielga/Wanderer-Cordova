var component = function () {
    this.tools = "";

    this.getId = function () {
        return "colin-wielga-tools"
    }
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.tools = "";
    }
    this.OnSave = function () {
        this.communicator.write("tools", this.tools);
    }
    this.OnLoad = function () {
        this.tools = "";
        if (this.communicator.canRead("tools")) {
            this.tools = this.communicator.read("tools");
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Tools";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }


    this.OnNewCharacter();
}

g.ComponetRegistry.registerCharacter(component);