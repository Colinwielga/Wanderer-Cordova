
ScottLeviCards.component = function () {
    var that = this;
    this.discardPile = [];
    this.joined = false;
    this.decklist = ScottLeviCards.decklist;
    this.isDragging = false;
    this.getId = function () {
        return "scott-levi-cards";
    };

    this.pickUp = function (ev) {
    };
    this.dropEmptyHand = function (data, event) {
        var index = this.hand.indexOf(data.guid);
        if (index > -1) {
            this.hand.splice(index, 1);
        }
        index = this.inPlay.indexOf(data.guid);
        if (index > -1) {
            this.inPlay.splice(index, 1);
        }
        this.hand.push(data.guid);
    };

    this.dropOn = function (cardNextToId, data, event) {
        var wasIndex = this.hand.indexOf(data.guid);
        if (wasIndex > -1) {
            var nowIndex = this.hand.indexOf(cardNextToId);
            if (nowIndex > -1) {
                nowIndex = this.hand.indexOf(cardNextToId);
                this.hand.splice(wasIndex, 1);
                this.hand.splice(nowIndex, 0, data.guid);
            } else if (this.canEnterPlay(data)) {
                this.hand.splice(wasIndex, 1);
                nowIndex = this.inPlay.indexOf(cardNextToId);
                this.inPlay.splice(nowIndex, 0, data.guid);
            }
        } else {
            wasIndex = this.inPlay.indexOf(data.guid);
            if (wasIndex > -1) {
                nowIndex = this.inPlay.indexOf(cardNextToId);
                if (nowIndex > -1) {
                    nowIndex = this.inPlay.indexOf(cardNextToId);
                    this.inPlay.splice(wasIndex, 1);
                    this.inPlay.splice(nowIndex, 0, data.guid);
                } else {
                    this.inPlay.splice(wasIndex, 1);
                    nowIndex = this.hand.indexOf(cardNextToId);
                    this.hand.splice(nowIndex, 0, data.guid);
                }
            }
        }
    };

    this.dropEmptyInPlay = function (data, event) {
        if (this.canEnterPlay(data)) {
            var index = this.hand.indexOf(data.guid);
            if (index > -1) {
                this.hand.splice(index, 1);
            }
            index = this.inPlay.indexOf(data.guid);
            if (index > -1) {
                this.inPlay.splice(index, 1);
            }
            this.inPlay.push(data.guid);
        }
    };

    this.canEnterPlay = function (data) {
        return data.image < 22;
    };

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
    };

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
            this.hand.splice(index + 1, 0, data.guid);
        }
        index = this.inPlay.indexOf(cardNextTo.guid);
        if (index > -1) {
            this.inPlay.splice(index + 1, 0, data.guid);
        }
    };

    this.isSwords = function (cardId) {
        var card = this.getCard(cardId);
        var num = parseInt(card.value);
        return num === 0 || num % 2 === 1;
    };

    this.isWands = function (cardId) {
        var card = this.getCard(cardId);
        var num = parseInt(card.value);
        return num === 0 ||
            num % 2 !== 0 &&
            num % 3 !== 0;
    };

    this.isCups = function (cardId) {
        var card = this.getCard(cardId);
        var num = parseInt(card.value);
        return num === 0 ||
            num === 1 ||
            num === 2 ||
            num === 3 ||
            num === 5 ||
            num === 8 ||
            num === 13 ||
            num === 21;
    };

    this.isPentacles = function (cardId) {
        var card = this.getCard(cardId);
        var num = parseInt(card.value);
        return num % 2 === 0;
    };

    this.swords = "swords";
    this.wands = "wands";
    this.pentacles = "pentacles";
    this.cups = "cups";

    this.getAbilities = function () {
        var cards = [];
        for (var i = 0; i < this.inPlay.length; i++) {
            cards.push(this.getCard(this.inPlay[i]));
        }

        var numWands = 0;
        var numCups = 0;
        var numSwords = 0;
        var numPentacles = 0;

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (this.cardArchetype[card.guid] === this.swords) {
                numSwords = numSwords + 1;
            }
            if (this.cardArchetype[card.guid] === this.pentacles) {
                numPentacles = numPentacles + 1;
            }
            if (this.cardArchetype[card.guid] === this.wands) {
                numWands = numWands + 1;
            }
            if (this.cardArchetype[card.guid] === this.cups) {
                numCups = numCups + 1;
            }
        }

        var WandsAbilities = ['Elements, control a palm-sized amount of your chosen element double the size for succeeding poker hand power levels.',
            'Telepathy, mental interference and protection from psychic attacks, higher discards allow temporary mind control.',
            'Matter Manipulation, alchemy and chemistry, growing/shrinking, invisibility.',
            'Time Manipulation; temporarily change one PC or NPC’s perception of time.',
            'Mastery, Aces now count as higher value than Kings and; Discard any Wand, draw a card; if it’s the Page draw 3 cards.',
            'Page of Wands, discard a Pair, interrupt enemy magickal attacks, break an on going enemy spell.',
            'Knight of Wands, discard Two Pairs, and discard any Prime numbered card; automatically pass the next Magick related skill check.',
            'Queen of Wands, You may help other Players pass checks, by discarding your own cards. Discard one card; if the person you are assisting fails their check, your hand size decreases by one.',
            'King of Wands, Discard Three of a Kind, cast any Magick Spell you can think of, work with the DM to determine something fair and flavorful.  (Stuff like: Time Reversal, Go Below Absolute Zero…)'
        ];
        var SwordsAbilities = ['Close Quarters, armed melee attacks (daggers, shivs, etc.)',
            'Mid Range, across the room attacks (throwing knives, hand guns, etc.)',
            'Long Range, across the block attacks (sniper rifle, laser, missile, etc.)',
            'Area of Effect, blast radius and multi-target attacks (grenades, flechettes, etc.)',
            'Mastery, three card flushes can count towards skill checks and; Discard any Sword card, draw a card; if it’s the Page draw 3 cards.',
            'Page of Swords, discard a Pair, make a Double Attack (same move twice or two different weapons).',
            'Knight of Swords, discard Two Pairs, make a Triple Attack.',
            'Queen of Swords, You may help other Players pass checks. Discard one card; if the person you are assisting fails their check, your hand size decreases by one.',
            'King of Swords, Discard Three of a Kind, gain an additional Shield layer; when your Encounter HP hits 0, reset it half full one time per combat.'
        ];
        var PentaclesAbilities = ['Botany, Any Character can eat flowers for power ups, but only Botanists know which plants will be beneficial and how to craft their own plant power ups for personal and party needs.  The number of tricks taken by botanist player determines number of positive effects; the DM’s tricks represent negative side effects. If the other Players involved take any tricks they may add their own qualities.',
            'Mobility, Piloting ground or space vehicles and advanced power armor acrobatics.',
            'Builder, Crafting technology.  Number of tricks taken in mini Hearts corresponds to what you can make.  How strong, how many, and how fast will be decided by the usual skill check resolution.  One trick, a wall/ramp/platform.  Two tricks, a weapon.  Three tricks, a pentacle/magick channeling item.  Four tricks, a new suit of armor.  Five tricks, a new scroll.  Six tricks, a vehicle.  Seven tricks, Whatever you want within reason to the DM and Party.',
            'Enhance Speed, give yourself or an ally character a speed boost. This counters/is countered by Wands Time Manipulation.',
            'Mastery, three card flushes can count towards skill checks and; Discard a Pentacle card, draw a card; if it’s the Page draw 3 cards.',
            'Page of Pentacles, Discard a Pair, make minor repairs to any technology.',
            'Knight of Pentacles, Discard Two Pairs, make major repairs to any technology.',
            'Queen of Pentacles, You may help other Players pass checks. Discard one card; if the person you are assisting fails their check, your hand size decreases by one.',
            'King of Pentacles, Discard Three of a Kind, must be Pentacle suited; your power armor suit can perpetually fly.  Discard Three of a Kind nonPentacles, gain the power of flight for the duration of an encounter.'
        ];
        var CupsAbilities = ['Perception, sizing up a situation, nonviolent conflict resolution.',
            'Coin, participating in the blockchain currency called Coin for any financial transactions.',
            'Energy, command a vast energy source for a specific task, like recharging a shield battery, or rebooting a scroll, etc. Sources of energy can be Spiritual, solar, mechanical, etc.',
            'Advanced Linking; transform into a combination of Avatars with one of your fellow players or an NPC.  Players are in charge of using their own abilities and weapons. Each must agree which specific functions they have control over.  If the player is with an NPC, they will have full control of the combined suit.',
            'Mastery, The Full Voltron, as long as your character is involved, you may fully combine with your entire party, but no more than that number at any given time.  Same rules as at Level 4, but now with more than 2 characters or players involved (three suits total) and; Discard a Pentacle card, draw a card; if it’s the Page draw 3 cards.',
            'Page of Cups, Discard a Pair, Saboteur, while doing something unexpected or from concealment, you can make a rogue-like sneak attack or action that sabotages anyone or something in the environment.',
            'Knight of Cups, Discard Two Pairs, Face Cards (Page-King) outrank and beat Wild and Major Arcana for the current round of combat/action.',
            'Queen of Cups, You may help other Players pass checks. Discard one card; if the person you are assisting fails their check, your hand size decreases by one.',
            'King of Cups, You may only advance to this level if you have the seven (chariot) and thirteen (death) In Play.  Discard Three of a Kind, Cup suited face Cards count as Wild for your next skill check.'
        ];

        var ActiveWandsAbilities = WandsAbilities.splice(0, numWands);
        var ActiveSwordsAbilities = SwordsAbilities.splice(0, numSwords);
        var ActiveCupsAbilities = CupsAbilities.splice(0, numCups);
        var ActivePentaclesAbilities = PentaclesAbilities.splice(0, numPentacles);
        var result = [];
        for (var i = 0; i < ActiveWandsAbilities.length; i++) {
            result.push("Magician: " + (i + 1) + ' - ' + ActiveWandsAbilities[i]);
        }
        for (var i = 0; i < ActiveSwordsAbilities.length; i++) {
            result.push("Warrior: " + (i + 1) + ' - ' + ActiveSwordsAbilities[i]);
        }
        for (var i = 0; i < ActivePentaclesAbilities.length; i++) {
            result.push("Scientist: " + (i + 1) + ' - ' + ActivePentaclesAbilities[i]);
        }
        for (var i = 0; i < ActiveCupsAbilities.length; i++) {
            result.push("Influencer: " + (i + 1) + ' - ' + ActiveCupsAbilities[i]);
        }

        var sum = 0;
        for (var i = 0; i < cards.length; i++) {
            sum = sum + parseInt(cards[i].value);
        }
        if ([1, 2, 3, 5, 7, 9, 11, 13, 17, 19, 23, 27, 29, 31, 37, 41, 43, 47, 52, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101].indexOf(sum) > -1) {
            result.push("If your Cards on the Table total numerical value adds up to a prime number, your character's Aces count as Wild; the Ace of Wands counts as a double Wild Card.");
        }
        if ([1, 4, 9, 16, 25, 36, 49, 64, 81, 100].indexOf(sum) > -1) {
            result.push("If you Cards on the Table total numerical value adds up to a square number, your character's square numbered cards count as Wild but remain their suit.");
        }
        var ascendingOrder = true;
        var descendingOrder = true;
        for (var i = 0; i < cards.length - 1; i++) {
            var leftValue = parseInt(cards[i].value);
            var rightValue = parseInt(cards[i + 1].value);
            if (rightValue < leftValue) {
                ascendingOrder = false;
            }
            if (rightValue > leftValue) {
                descendingOrder = false;
            }
        }
        if (cards.length < 2) {
            descendingOrder = false;
            ascendingOrder = false;
        }

        if (descendingOrder) {
            result.push("If your Cards on the Table are in descending numerical order, your character may count odd numbered straights (1, 3, 5, etc.) towards skill checks.");
        }
        if (ascendingOrder) {
            result.push("If your Cards on the Table are in ascending numerical order, your character may count even numbered straights (2, 4, 6, etc.) towards skill checks.");
        }
        return result;
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.key = Math.random() + "";
        this.communicator = communicator;
        this.page = page;

        dependencies[0].onJoin(groupName => {
            g.services.timeoutService.$timeout(function () {
                that.discardPile = [];
                that.joined = true;
            });
            g.services.SignalRService.tryRemoveCallback(that.key);
            g.services.SignalRService.setCallback(that.key,
                groupName,
                function (message) { return message.module === that.getId(); },
                function (message) {
                    g.services.timeoutService.$timeout(function () {
                        that.discardPile.push(message);
                        if (that.discardPile.length > 5) {
                            that.discardPile.splice(0, 1);
                        }
                    });
                });
        });
    };

    this.OnNewCharacter = function () {
        this.inPlay = [];
        this.hand = [];
        this.cardArchetype = {};
        this.selectedDeck = ScottLeviCards.decklist[0];
        this.activeDeck = this.selectedDeck.defaultActive();
    };
    this.OnSave = function () {
        this.communicator.write("inPlay", this.inPlay);
        this.communicator.write("hand", this.hand);
        this.communicator.write("activeDeck", this.activeDeck);
        this.communicator.write("cardArchetype", this.cardArchetype);
        this.communicator.write("selectedDeck", this.selectedDeck.guid);
    };
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

                if (this.communicator.canRead("cardArchetype")) {
                    this.cardArchetype = this.communicator.read("cardArchetype");
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
        return "Tarot";
    };
    this.getRequires = function () {
        return ["wanderer-core-save"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            },
            getHand: function () {
                var result = [];
                for (var i = 0; i < that.hand.length; i++) {
                    result.push(that.getCard(that.hand[i]));
                }
                return result;
            },
            getCard: function (id) {
                return that.getCard(id);
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
                if (g.services.SignalRService.HasCallback(that.key)) {
                    g.services.SignalRService.Send(that.key, {
                        module: that.getId(),
                        callbackName: "card-played",
                        playedBy: that.page.name,
                        cardId: cardID
                    });
                }
            }
        }
        for (var i = 0; i < this.inPlay.length; i++) {
            if (this.inPlay[i] === cardID) {
                this.inPlay.splice(i, 1);
            }
        }
    };
    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ScottLeviCards.component);
