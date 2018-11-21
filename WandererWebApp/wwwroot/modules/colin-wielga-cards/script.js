ColinWielgaCards.component = function () {
    var that = this;
    this.decklist = ColinWielgaCards.decklist;
    this.getId = function () {
        return "colin-wielga-cards";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.godsPublic = dependencies[0];
    };
    this.OnNewCharacter = function () {
        this.hand = [];
        this.selectedDeck = ColinWielgaCards.decklist[0];
        this.activeDeck = this.selectedDeck.defaultActive();
    };
    this.OnSave = function () {
        this.communicator.write("hand", this.hand);
        this.communicator.write("activeDeck", this.activeDeck);
        this.communicator.write("selectedDeck", this.selectedDeck.guid);
    };
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1.4) {
            if (this.communicator.canRead("selectedDeck")) {
                var deckId = this.communicator.read("selectedDeck");
                this.selectedDeck = null;
                for (var i = 0; i < ColinWielgaCards.decklist.length; i++) {
                    if (ColinWielgaCards.decklist[i].guid === deckId) {
                        this.selectedDeck = ColinWielgaCards.decklist[i];
                        break;
                    }
                }
                if (this.selectedDeck === null) {
                    this.selectedDeck = ColinWielgaCards.decklist[0];
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
        return "Hand";
    };
    this.getRequires = function () {
        return [];//"colin-wielga-gods"
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.4;
            }
        };
    };

    this.deckSelected = function () {
        this.hand = [];
        this.activeDeck = this.selectedDeck.defaultActive();
    };

    this.getCard = function (id) {
        return this.selectedDeck.allCards[id];
    };

    this.toggleCardActive = function (id) {
        var at = this.activeDeck.indexOf(id);
        if (at === -1) {
            this.activeDeck.push(id);
        } else {
            this.activeDeck.splice(at, 1);
        }
    };

    this.inDeck = function (id) {
        return this.activeDeck.indexOf(id) !== -1;
    };

    this.possibleCards = function () {
        var keys = [];
        for (var key in this.selectedDeck.allCards) {
            // what is this if for??
            if (this.selectedDeck.allCards.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    this.startingDeck = function () {
        return this.possibleCards();
    };

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
};

g.services.componetService.registerCharacter(ColinWielgaCards.component);