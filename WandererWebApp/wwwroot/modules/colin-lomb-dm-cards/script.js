let ColinLombDmCards = {};

ColinLombDmCards.component = function () {
    var that = this;

    this.getId = function () {
        return "colin-lomb-dm-cards";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.rollsPublic = dependencies[0];
        this.logger = logger;
    };

    this.OnNewCharacter = function () {
        this.hand = [];
    };

    this.OnSave = function () {
        this.communicator.write("hand", this.hand);
    };

    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("hand")) {
                this.hand = this.communicator.read("hand");
            }
        }
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
        return "Lomb DM Hand";
    };

    this.getRequires = function () {
        return ["colin-wielga-roll"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };

    this.draw = function () {
        var center = Math.round(Math.random() * 20);
        var dc = this.rollsPublic.generateRollObject(center);
        this.hand.push(dc);
    };

    this.discard = function (card) {
        var index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
        };

        that.logger.infoWithAction("undo dicard?", "undo", function(){
            that.hand.push(card);
        });
    };

    this.getDC = function (outcome) {
        return ColinWielgaRoll.getDC(outcome);
    }

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinLombDmCards.component);
