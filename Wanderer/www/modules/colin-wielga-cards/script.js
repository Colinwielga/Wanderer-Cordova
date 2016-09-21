var component = function () {

    this.getId = function () {
        return "colin-wielga-cards"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
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
        return "Hand";
    }
    this.getRequires = function () {
        return ["colin-wielga-gods"];
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

    this.getImage = function (id) {
        return Card.getCard(id).getImage();
    }

    this.getName = function (id) {
        return Card.getCard(id).name;
    }

    this.getText = function (id) {
        return Card.getCard(id).text;
    }

    this.draw = function () {
        if (this.cards.length < Card.deckSize()) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = Card.draw(this.godsPublic.getGods());
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