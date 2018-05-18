
ScottLeviCards.component = function () {
    var that = this;
    this.decklist = ScottLeviCards.decklist;
    this.isDragging = false;
    this.getId = function () {
        return "scott-levi-cards"
    }

    this.pickUp = function(ev) {
        //ev.dataTransfer.setData("cardId", ev.target.dataset["cardId"]);
        //console.log("did that work??");
    }
    this.dropEmptyHand = function (data, event) {
        var index = this.hand.indexOf(data.guid);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        var index = this.inPlay.indexOf(data.guid);
        if (index > -1) {
            this.inPlay.splice(index, 1);
        }
        this.hand.push(data.guid)
    }

    this.dropEmptyInPlay = function (data, event) {
        var index = this.hand.indexOf(data.guid);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        index = this.inPlay.indexOf(data.guid);
        if (index > -1) {
            this.inPlay.splice(index, 1);
        }
        this.inPlay.push(data.guid)
    }

    this.dropLeft = function (cardNextTo, data, event) {
        var index = this.hand.indexOf(data.guid);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        index = this.inPlay.indexOf(data.guid);
        if (index > -1) {
            this.inPlay.splice(index, 1);
        }
        index = this.hand.indexOf(cardNextTo.guid);
        if (index > -1) {
            this.hand.splice(index, 0, data.guid);
        }
        index = this.inPlay.indexOf(cardNextTo.guid);
        if (index > -1) {
            this.inPlay.splice(index, 0, data.guid);
        }
    }
    
    this.dropRight = function (cardNextTo, data, event) {
        var index = this.hand.indexOf(data.guid);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        index = this.inPlay.indexOf(data.guid);
        if (index > -1) {
            this.inPlay.splice(index, 1);
        }
        index = this.hand.indexOf(cardNextTo.guid);
        if (index > -1) {
            this.hand.splice(index+1, 0, data.guid);
        }
        index = this.inPlay.indexOf(cardNextTo.guid);
        if (index > -1) {
            this.inPlay.splice(index+1, 0, data.guid);
        }
    }
    this.swords = "swords";
    this.wands = "wands";
    this.pentacles = "pentacles";
    this.cups = "cups"
    this.cardArchetype = {
        "{E4FCE685-BCE3-4CED-B911-2DDF38E99C85}": this.wands,
        "{DA9712EC-5B22-4B68-9883-4B51C2F47D79}": this.cups,
        "{777CF479-0630-4653-AD00-5DFA574D4828}": this.swords,
        "{7C26A612-D5CF-4DC1-891D-70C65B6FA070}": this.pentacles
    }

    this.getAbilities = function () {
        //var cards = [];
        //for (var card in this.getCard(this.inPlay)) {
        //    cards.push(card);
        //}
        var cards = [];
        cards.push(this.getCard("{E4FCE685-BCE3-4CED-B911-2DDF38E99C85}"));
        cards.push(this.getCard("{DA9712EC-5B22-4B68-9883-4B51C2F47D79}"));
        cards.push(this.getCard("{777CF479-0630-4653-AD00-5DFA574D4828}"));
        cards.push(this.getCard("{7C26A612-D5CF-4DC1-891D-70C65B6FA070}"))
        

        // todo a whole lot of code goes here!
        
        return ["test 1", "test 2", "test 3"];
    }

    this.Dragging = function() {
        return true;
    }

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
    }
    this.OnNewCharacter = function () {
        this.inPlay = [];
        this.hand = [];
        this.cardArchetype = {};
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
                    if (ScottLeviCards.decklist[i].guid === deckId) {
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
        if (at === -1) {
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
                for (var i = 0; i < this.inPlay.length; i++) {
                    if (this.inPlay[i] === num) {
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
