var CoreStartSystem = {};

CoreStartSystem.component = function () {
    
    this.getId = function () {
        return "core-start-systems";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () { };
    
    this.OnSave = function () { };

    this.OnLoad = function () { };

    this.OnUpdate = function () { };

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
        return "Systems";
    };

    this.getSystemAccessers = function () {
        return g.services.accountService.currentAccount.characterAccessers;
    };
    this.OpenSystem = function (accesser) {
        return g.services.pageService.OpenSystem(accesser);
    };
    this.Add = function () {
        return g.services.pageService.AddSystem();
    };

    this.OnNewCharacter();
};

g.services.componetService.registerStart(CoreStartSystem.component);