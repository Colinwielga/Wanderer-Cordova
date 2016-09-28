var component = function () {

    this.getId = function () {
        return "tote-hughes-titanagon-cards"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    }
    this.OnNewCharacter = function () {
        this.cards = [];
    }
    this.OnSave = function () {
        this.communicator.write("cards", this.cards);
    }
    this.OnLoad = function () {
        if (this.communicator.lastVersion() === -1) {
            if (this.communicator.canRead("cards")) {
                this.cards = JSON.parse(this.communicator.read("cards"));
            } else {
                this.OnNewCharacter();
            }
        } else if (this.communicator.lastVersion() === this.getPublic().getVersion()) {

            if (this.communicator.canRead("cards")) {
                this.cards = this.communicator.read("cards");
            } else {
                this.OnNewCharacter();
            }
        }
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Ousichor Hand";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.1;
            }
        }
    }


    this.getCardName = function (id) {
        return TitanagonCard.getCard(id).name;
    }
    this.getCardAdjective = function (id) {
        return TitanagonCard.getCard(id).adjective;
    }

    this.getCardPolyID = function (id) {
        return TitanagonCard.getCard(id).polyID;
    }
    this.getCardPolyPoints = function (id) {
        return TitanagonCard.getCard(id).polyPoints;
    }

    this.getCardValue = function (id) {
        return TitanagonCard.getCard(id).value;
    }
    this.getCardAbility = function (id) {
        return TitanagonCard.getCard(id).ability;
    }

    this.getCardColor = function (id) {
        return TitanagonCard.getCard(id).color;
    }

    this.draw = function () {
        if (this.cards.length < TitanagonCard.deckSize()) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = TitanagonCard.draw();
                fail = false;
                for (var i = 0; i < this.cards.length; i++) {
                    if (this.cards[i] === num) {
                        fail = true;
                        break;
                    }
                }
            }
            this.cards.push(num);
        }
    };
    this.discard = function (cardID) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i] === cardID) {
                this.cards.splice(i, 1);
            }
        }
    };
    this.OnNewCharacter();
}

g.ComponentManager.register(component);
