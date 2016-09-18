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
        if (this.communicator.canRead("tools")) {
            this.tools = this.communicator.read("tools");
        } else {
            this.tools = 8;
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Tools";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            }
        }
    }

    this.OnNewCharacter();
}

g.Wanderer.register(component);