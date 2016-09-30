﻿var component = function () {

    this.getId = function () {
        return "colin-wielga-cards"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
        this.godsPublic = dependencies[0];
    }
    this.OnNewCharacter = function () {
        this.cards = [];
        this.deck = [];
    }
    this.OnSave = function () {
        this.communicator.write("cards", this.cards);
        this.communicator.write("deck", this.deck);
    }
    this.OnLoad = function () {
        var version =this.communicator.lastVersion();
        if (version === -1) {
            if (this.communicator.canRead("cards")) {
                this.cards = JSON.parse(this.communicator.read("cards"));
                this.deck = this.startingDeck();
            } else {
                this.OnNewCharacter();
            }
        } else if (version === 1.1) {
            if (this.communicator.canRead("cards")) {
                this.cards = this.communicator.read("cards");
                this.deck = this.startingDeck();
            } else {
                this.OnNewCharacter();
            }
        } else if (version === this.getPublic().getVersion()) {
            if (this.communicator.canRead("cards") && this.communicator.canRead("deck")) {
                this.cards = this.communicator.read("cards");
                this.deck = this.communicator.read("deck");
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
                return 1.2;
            }
        }
    }

    this.getCard=function (id) {
        return Card.getCard(id);
    }

    //this.getCardValue = function (id) {
    //    return Card.getCard(id).getValue();
    //}

    //this.getCardImage = function (id) {
    //    return Card.getCard(id).getImage();
    //}

    //this.getCardName = function (id) {
    //    return Card.getCard(id).name;
    //}

    //this.getCardAbility = function (id) {
    //    return Card.getCard(id).text;
    //}

    this.toggleDeck = function(id) {
        var at = this.deck.indexOf(id);
        if (at == -1) {
            this.deck.push(id);
        } else {
            this.deck.splice(at, 1);
        }
    }

    this.inDeck = function (id) {
        return this.deck.indexOf(id)!== -1;
    }

    this.possibleCards = function () {
        return Card.possibleCards();
    }

    this.startingDeck = function() {
        return this.possibleCards();
    }

    this.draw = function () {
        if (this.cards.length < this.deck.length) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = this.deck[Math.floor(Math.random() * this.deck.length)];
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