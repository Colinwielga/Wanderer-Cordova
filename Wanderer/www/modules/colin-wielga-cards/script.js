ColinWielgaCards.component = function () {

    this.getId = function () {
        return "colin-wielga-cards"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
    }
    this.OnNewCharacter = function () {
        this.hand = [];
        this.activeCards = [];
        this.selectedDeck = ColinWielgaCards.decklist[0];
    }
    this.OnSave = function () {
        this.communicator.write("hand", this.hand);
        this.communicator.write("activeCards", this.activeCards);
        this.communicator.write("selectedDeck", this.selectedDeck.id);
    }
    this.OnLoad = function () {
        var version =this.communicator.lastVersion();
        if (version === -1 || version === 1.1) {
            this.OnNewCharacter();
            if (this.communicator.canRead("cards")) {
                this.hand = JSON.parse(this.communicator.read("cards"));
            }
            this.activeCards = this.startingDeck();
            this.selectedDeck = ColinWielgaCards.decklist[0];
        } else if (version === 1.2) {
            this.OnNewCharacter();
            if (this.communicator.canRead("cards")){
                this.hand = this.communicator.read("cards");
            }
            if (this.communicator.canRead("deck")) {
                this.activeCards = this.communicator.read("deck");
            }
        } else if (version === 1.3) {
            this.OnNewCharacter();
            if (this.communicator.canRead("hand")) {
                this.hand = this.communicator.read("hand");
            }
            if (this.communicator.canRead("activeCards")) {
                this.activeCards = this.communicator.read("activeCards");
            }
            if (this.communicator.canRead("selectedDeck")) {
                var deckId = this.communicator.read("selectedDeck");
                this.selectedDeck = null;
                for (var i = 0; i < ColinWielgaCards.decklist.length; i++) {
                    if (ColinWielgaCards.decklist[i] == deckId){
                        this.selectedDeck = ColinWielgaCards.decklist[i];
                        break;
                    }
                }
                if (this.selectedDeck === null) {
                    this.selectedDeck = ColinWielgaCards.decklist[0];
                }
            } else {
                this.OnNewCharacter();
            }
        }
    }

    this.getHmtl = function () {
        return "modules/"+ this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Hand";
    }
    this.getRequires = function () {
        return ["colin-wielga-gods"];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.3;
            }
        }
    }

    this.getCard=function (id) {
        return this.selectedDeck.allCards[id];
    }

    this.toggleCardActive = function (id) {
        var at = this.activeCards.indexOf(id);
        if (at == -1) {
            this.activeCards.push(id);
        } else {
            this.activeCards.splice(at, 1);
        }
    }

    this.inDeck = function (id) {
        return this.activeCards.indexOf(id)!== -1;
    }

    this.possibleCards = function () {
        var keys = [];
        for (var key in this.selectedDeck.allCards) {
            // what is this if for??
            if (this.selectedDeck.allCards.hasOwnProperty(key)) {
                keys.push(parseInt(key));
            }
        }
        return keys;
    }

    this.startingDeck = function() {
        return this.possibleCards();
    }

    this.draw = function () {
        if (this.hand.length < this.activeCards.length) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = this.activeCards[Math.floor(Math.random() * this.activeCards.length)];
                fail = false;
                for (var i = 0; i < this.hand.length; i++) {
                    if (this.hand[i] === num) {
                        fail = true;
                        break;
                    }
                }
            }
            this.hand.push(num);
        }
    };
    this.discard = function (cardID) {
        for (var i = 0; i < this.hand.length; i++) {
            if (this.hand[i] === cardID) {
                this.hand.splice(i, 1);
            }
        }
    };
    this.OnNewCharacter();
}

g.ComponentManager.register(ColinWielgaCards.component);