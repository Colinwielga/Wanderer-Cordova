var component = function () {
    this.notes = ""
    this.getId = function () {
        return "colin-wielga-notes"
    }
    this.OnStart = function (communicator, dependencies) {
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