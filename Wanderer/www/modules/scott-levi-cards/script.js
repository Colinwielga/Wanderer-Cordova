
ScottLeviCards.component = function () {
    var that = this;
    this.decklist = ScottLeviCards.decklist;
    this.getId = function () {
        return "scott-levi-cards"
    }

    this.pickUp = function(ev) {
        ev.dataTransfer.setData("cardId", ev.target.dataset["cardId"]);
    }
    this.Drop = function(ev) {
        var index = this.hand.indexOf(ev.dataTransfer.getData("cardId"));
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        this.inPlay.push(ev.dataTransfer.getData("cardId"))
        
    }

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
    }
    this.OnNewCharacter = function () {
        this.inPlay = [];
        this.hand = [];
        this.selectedDeck = ScottLeviCards.decklist[0];
        this.activeDeck = this.selectedDeck.defaultActive();
    }
    this.OnSave = function () {
        this.communicator.write("inPlay", this.inPlay);
        this.communicator.write("hand", this.hand);
        this.communicator.write("activeDeck", this.activeDeck);
        this.communicator.write("selectedDeck", this.selectedDeck.guid);
    }
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
     
        if (version === 1.0) {
            if (this.communicator.canRead("selectedDeck")) {
                var deckId = this.communicator.read("selectedDeck");
                this.selectedDeck = null;
                for (var i = 0; i < ScottLeviCards.decklist.length; i++) {
                    if (ScottLeviCards.decklist[i].guid == deckId) {
                        this.selectedDeck = ScottLeviCards.decklist[i];
                        break;
                    }
                }
                if (this.selectedDeck === null) {
                    this.selectedDeck = ScottLeviCards.decklist[0];
                }
                // now we have selected a deck
                // we need the active cards
                if (this.communicator.canRead("activeDeck")) {
                    var nextActiveDeck = this.communicator.read("activeDeck");
                    this.activeDeck = [];
                    nextActiveDeck.forEach(function (id) {
                        if (that.selectedDeck.allCards.hasOwnProperty(id)) {
                            that.activeDeck.push(id);
                        }
                    });
                }
                // now we have selected a deck
                // we need the active cards
                if (this.communicator.canRead("hand")) {
                    var nextHand = this.communicator.read("hand");
                    nextHand.forEach(function (id) {
                        if (that.selectedDeck.allCards.hasOwnProperty(id)) {
                            that.hand.push(id);
                        }
                    });
                }
                if (this.communicator.canRead("inPlay")) {
                    var nextInPlay = this.communicator.read("inPlay");
                    nextInPlay.forEach(function (id) {
                        if (that.selectedDeck.allCards.hasOwnProperty(id)) {
                            that.inPlay.push(id);
                        }
                    });
                }
            }
        }
    }

    this.getHmtl = function () {
        return "modules/"+ this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.canClose = function () {
        return true;
    }
    this.getTitle = function () {
        return "Tarot";
    }
    this.getRequires = function () {
        return [];//"colin-wielga-gods"
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        }
    }

    this.deckSelected = function () {
        this.hand = [];
        this.activeDeck = this.selectedDeck.defaultActive();
    }

    this.getCard=function (id) {
        return this.selectedDeck.allCards[id];
    }

    this.toggleCardActive = function (id) {
        var at = this.activeDeck.indexOf(id);
        if (at == -1) {
            this.activeDeck.push(id);
        } else {
            this.activeDeck.splice(at, 1);
        }
    }

    this.inDeck = function (id) {
        return (this.activeDeck.indexOf(id) !== -1);
    }

    this.possibleCards = function () {
        var keys = [];
        for (var key in this.selectedDeck.allCards) {
            // what is this if for??
            if (this.selectedDeck.allCards.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    this.startingDeck = function() {
        return this.possibleCards();
    }

    this.draw = function () {
        if (this.hand.length < this.activeDeck.length) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = this.activeDeck[Math.floor(Math.random() * this.activeDeck.length)];
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

g.services.componetService.registerCharacter(ScottLeviCards.component);