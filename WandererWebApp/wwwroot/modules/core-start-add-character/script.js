var CoreStartAddCharacters = {};

CoreStartAddCharacters.component = function () {
    var that = this;
    this.getId = function () {
        return "core-start-add-character";
    };
    this.getSystem = function () {
        return "Core"
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    this.OnNewCharacter = function () {
    };
    this.OnSave = function () {
    };
    this.OnLoad = function () {
    };
    this.OnUpdate = function () {
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
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.getTitle = function () {
        return "Add Character";
    };
    this.OnNewCharacter();
    this.OpenCharacter = function () {
        g.services.pageService.OpenCharacterById(that.toOpen);
    };
};

g.services.componetService.registerStart(CoreStartAddCharacters.component);