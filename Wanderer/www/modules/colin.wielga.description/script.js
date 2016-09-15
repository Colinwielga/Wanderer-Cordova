var component = function () {
    this.getId = function () {
        return "colin.wielga.description"
    }
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.description = "";
        this.name = "Nameless";
    }
    this.OnSave = function () {
        this.communicator.write("description", this.description);
        this.communicator.write("name", this.name);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("description")) {
            this.description = this.communicator.read("description");
        } else {
            this.description = "";
        }
        if (this.communicator.canRead("name")) {
            this.name = this.communicator.read("name");
        } else {
            this.name = "";
        }
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Description";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        var that = this;
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            },
            getCharacterDescription: function () {
                return that.description;
            },
            getCharacterName: function () {
                return that.name;
            }
        }
    }
    this.OnNewCharacter();
}

g.Wanderer.register(component);