var ColinXiAlignment = {};

ColinXiAlignment.component = function () {

    // all component need a unique ID
    this.getId = function () {
        return "colin-xi-alignment";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    this.OnNewCharacter = function () {
        this.Weights = [];
        for (let item in ColinXiAlignment) {
            Weights.puh({
                name: "Emotional",
                weight: 1,
                getCard: item.getCard
            });
        }
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
            },
            getWeights: function () {

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
        return "Xi Alignment";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinXiAlignment.component);