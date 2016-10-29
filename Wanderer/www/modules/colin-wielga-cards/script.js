ColinWielgaCards.component = function () {
    this.decklist = ColinWielgaCards.decklist;
    this.getId = function () {
        return "colin-wielga-cards"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
    }
    this.OnNewCharacter = function () {
        this.hand = [];
        this.activeDeck = [];
        this.selectedDeck = ColinWielgaCards.decklist[0];
    }
    this.OnSave = function () {
        this.communicator.write("hand", this.hand);
        this.communicator.write("activeDeck", this.activeDeck);
        this.communicator.write("selectedDeck", this.selectedDeck.id);
    }
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        //if (version === -1 || version === 1.1) {
        //    if (this.communicator.canRead("cards")) {
        //        this.hand = JSON.parse(this.communicator.read("cards"));
        //    }
        //    this.activeDeck = this.startingDeck();
        //    this.selectedDeck = ColinWielgaCards.decklist[0];
        //} else if (version === 1.2) {
        //    if (this.communicator.canRead("cards")){
        //        this.hand = this.communicator.read("cards");
        //    }
        //    if (this.communicator.canRead("deck")) {
        //        this.activeDeck = this.communicator.read("deck");
        //    }
        //} else if (version === 1.3) {
        //    if (this.communicator.canRead("hand")) {
        //        this.hand = this.communicator.read("hand");
        //    }
        //    if (this.communicator.canRead("activeDeck")) {
        //        this.activeDeck = this.communicator.read("activeDeck");
        //    }
        //    if (this.communicator.canRead("selectedDeck")) {
        //        var deckId = this.communicator.read("selectedDeck");
        //        this.selectedDeck = null;
        //        for (var i = 0; i < ColinWielgaCards.decklist.length; i++) {
        //            if (ColinWielgaCards.decklist[i] == deckId){
        //                this.selectedDeck = ColinWielgaCards.decklist[i];
        //                break;
        //            }
        //        }
        //        if (this.selectedDeck === null) {
        //            this.selectedDeck = ColinWielgaCards.decklist[0];
        //        }
        //    }
        //} else 
        if(version ===1.4) {
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
        return [];//"colin-wielga-gods"
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.4;
            }
        }
    }

    this.deckSelected = function () {
        this.hand = [];
        this.activeDeck=
        this.selectedDeck.defaultActive();
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

g.ComponentManager.register(ColinWielgaCards.component);