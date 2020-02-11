//Literally a copy/paste of Notes but renamed and with different placeholder text.
var component = function () {
    this.issue = "";
    this.getId = function () {
        return "dc-kingdom-issue";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
    };
    this.OnNewCharacter = function () {
        this.issue = "";
    };
    this.OnSave = function () {
        this.communicator.write("issue", this.issue);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("issue")) {
            this.issue = this.communicator.read("issue");
        } else {
            this.issue = "";
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
        return "Kingdom Issue";
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

    this.getSystem = function () {
        return "Kingdom";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(component);
