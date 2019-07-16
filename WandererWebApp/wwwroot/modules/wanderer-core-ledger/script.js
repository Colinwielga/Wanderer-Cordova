var component = function () {

    this.getId = function () {
        return "wanderer-core-ledger";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {};
    this.OnNewCharacter = function () {
        var message = {};
        message.sender = "Colin";
        message.timestamp = "12:45";
        message.text = "Hello World!";
        this.messages = [message]; 
    };
    this.OnSave = function () {};
    this.OnLoad = function () {};
    this.getRequires = function () {
        return [];
    };
    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            }
        };
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getTitle = function () {
        return "Ledger";
    };
};

g.services.componetService.registerCharacter(component);