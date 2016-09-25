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
        this.communicator.write("cards",JSON.stringify(this.cards));
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("cards")) {
            this.cards = JSON.parse(this.communicator.read("cards"));
        } else {
            this.OnNewCharacter();
        }
    }

    this.getHmtl = function () {
        return "modules/"+ this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Ousichor Hand";
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


    this.getCardName = function (id) {
        return TitanagonCard.getCard(id).name;
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

    this.getCardPath = function (id) {
        return TitanagonCard.getCard(id).getCardPath();
    }

    this.getText = function (id) {
        return TitanagonCard.getCard(id).text;
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
