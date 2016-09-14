var component = function () {
    this.notes = ""
    this.getId = function () {
        return "colin.wielga.notes"
    }
    this.OnStart = function (communicator) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.notes = "";
    }
    this.OnSave = function () {
        this.communicator.write("notes", this.notes);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("notes")) {
            this.notes = this.communicator.read("notes");
        } else {
            this.notes = "";
        }
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Notes";
    }
    this.getDescription = function () {
        return "This is a unimplemented componet";
    }
    this.getVersion = function () {
        return 1;
    }
}

g.Wanderer.register(component);