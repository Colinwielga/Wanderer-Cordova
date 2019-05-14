let ColinLombDmCards = {};

ColinLombDmCards.Card = function (text, value, image) {
    return {
        text: text,
        value: value,
        image: image
    };
};

ColinLombDmCards.component = function () {

    this.getId = function () {
        return "colin-lomb-dm-cards";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.godsPublic = dependencies[0];
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
        return ["colin-lomb-alignment"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };

    this.draw = function () {
        var card = this.godsPublic.getCardContent();
        this.hand.push(card);
    };

    this.discard = function (card) {
        var index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinLombDmCards.component);
