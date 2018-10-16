var component = function () {
    this.notes = "";
    this.getId = function () {
        return "colin-wielga-notes";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
    };
    this.OnNewCharacter = function () {
        this.notes = "";
    };
    this.OnSave = function () {
        this.communicator.write("notes", this.notes);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("notes")) {
            this.notes = this.communicator.read("notes");
        } else {
            this.notes = "";
        }
    };
    this.canClose = function () {
        return true;
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.getTitle = function () {
        return "Notes";
    };
    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(component);

/*This is the simpliest module you can make in Wanderer.
Starts as a blank text box, then uses functions to save, load, etc.
These functions can all be found in the other modules, but this is a good starting point for understanding the app.
-Scott*/ 