var component = function () {
    this.description = "";
    this.name = "";

    this.getId = function () {
        return "colin.wielga.description"
    }
    this.OnStart = function (communicator) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.description = "";
        this.name = "";
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
    this.getDescription = function () {
        return "This is a unimplemented componet";
    }
    this.getVersion = function () {
        return 1;
    }
}

g.Wanderer.register(component);