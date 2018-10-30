﻿var ScottLeviHearts = {};

ScottLeviHearts.component = function () {
    this.playersInRoom = [];
    this.challenges = [];
    this.games = [];
    this.joined = false;
    var that = this;

    this.getId = function () {
        return "scott-levi-hearts";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.page = page;
        this.key = Math.random() + "";
        this.id = Math.random() + "";
        this.scottLeviHand = dependencies[0];
        dependencies[1].onJoin(groupName => {
            g.services.timeoutService.$timeout(function () {
                that.playersInRoom = [];
                that.challenges = [];
                that.games = [];
                that.joined = true;
            });
            g.services.SingnalRService.tryRemoveCallback(that.key);
            g.services.SingnalRService.setCallback(that.key,
                groupName,
                function (message) { return message.module === that.getId(); },
                function (message) {
                    console.log("got message:", message);
                    if (message.type === "joined Game") {
                        if (message.id !== that.id) {
                            g.services.timeoutService.$timeout(function () {
                                that.AddPlayer(message.id, message.name);
                            });
                            g.services.SingnalRService.Send(that.key, {
                                module: that.getId(),
                                type: "In Room",
                                name: that.page.name,
                                id: that.id
                            });
                        }
                    } else if (message.type === "In Room") {
                        if (message.id !== that.id) {
                            g.services.timeoutService.$timeout(function () {
                                that.AddPlayer(message.id, message.name);
                            });
                        }
                    } else if (message.type === "Challenge") {
                        if (message.challengeeId === that.id) {
                            g.services.timeoutService.$timeout(function () {
                                that.challenges.push({
                                    challengerName: message.challengerName,
                                    status: "Open",
                                    challengeId: message.challengeId,
                                    challengeeId: message.challengeeId,
                                    challengerId: message.challengerId
                                });
                            });
                            g.services.SingnalRService.Send(that.key, {
                                module: that.getId(),
                                type: "Challenge Recived",
                                challengerName: that.page.challengerName,
                                challengerId: message.challengerId,
                                challengeId: message.challengeId
                            });
                        }
                    } else if (message.type === "Challenge Recived") {
                        if (message.challengerId === that.id) {
                            for (var i = 0; i < that.challenges.length; i++) {
                                var target = that.challenges[i];
                                if (target.challengeId === message.challengeId) {
                                    target.status = "Received";
                                    g.services.timeoutService.$timeout(function () {
                                    });
                                }
                            }
                        }
                    } else if (message.type === "Challenge Rejected") {
                        if (message.challengerId === that.id) {
                            for (i = 0; i < that.challenges.length; i++) {
                                target = that.challenges[i];
                                if (target.challengeId === message.challengeId) {
                                    target.status = "Rejected";
                                    g.services.timeoutService.$timeout(function () {
                                    });
                                }

                            }
                        }
                    } else if (message.type === "Challenge Revoked") {
                        if (message.challengeeId === that.id) {
                            for (i = 0; i < that.challenges.length; i++) {
                                target = that.challenges[i];
                                if (target.challengeId === message.challengeId) {
                                    target.status = "Revoked";
                                    g.services.timeoutService.$timeout(function () { });
                                }
                            }
                        }
                    } else if (message.type === "Challenge Accepted") {
                        if (message.challengerId === that.id) {
                            for (i = 0; i < that.challenges.length; i++) {
                                target = that.challenges[i];
                                if (target.challengeId === message.challengeId) {
                                    var oppo;
                                    if (target.challengeeId === that.id) {
                                        oppo = target.challengerName;
                                    } else {
                                        oppo = target.challengeeName;
                                    }
                                    that.games.push(that.makeGame(oppo, target.challengeId, true));
                                    that.challenges.splice(i, 1);
                                    g.services.timeoutService.$timeout(function () { });
                                }
                            }
                        }
                    } else if (message.type === "Played Card") {
                        // we got a message that they played a card
                        // first we have to see what game the card goes with
                        for (i = 0; i < that.games.length; i++) {
                            target = that.games[i];
                            // check to make sure the other player played the caed
                            if (target.gameId === message.gameId && message.playerId !== that.id) {

                                // add the card they played to inplay
                                target.inPlay.push({
                                    module: that.getId(),
                                    card: that.scottLeviHand.getCard(message.cardId),
                                    playedBy: message.playedBy
                                });

                                // yeah understanable mistake
                                // in js you have:
                                // make equal   = <- this one set the vareable on the left to the value on the right
                                // is equal check (weak) == <- this one will return true if the things are similar
                                //          this one is bad - similar is poorly defined
                                           
                                // is equal check (strong) === <- this one will retunr true if the things are the same
                                // all do different things
                                // cool
                                // and look at that!
                                // we totally have it
                                target.IsYourTurn = true;
                                
                                // weird little thing that tells the UI to update
                                // don't worry about it for now
                                g.services.timeoutService.$timeout(function () { });
                            }
                        }
                    } else if (message.type === "Left Game") {
                        if (message.playerId !== that.id) {
                            for (i = 0; i < that.games.length; i++) {
                                if (message.gameId === that.games[i].gameId) {
                                    that.games[i].alone = true;
                                    g.services.timeoutService.$timeout(function () { });
                                }
                            }
                        }
                    }
                });
            g.services.SingnalRService.Join(groupName, this.key);
            g.services.SingnalRService.Send(that.key, {
                module: that.getId(),
                type: "joined Game",
                name: that.page.name,
                id: that.id
            });
        });
    };

    this.AddPlayer = function (playerId, playerName) {
        var alreadyAdded = false;
        for (var i = 0, len = that.playersInRoom.length; i < len; i++) {
            if (that.playersInRoom[i].id === playerId) {
                alreadyAdded = true;
            } else {
                that.playersInRoom[i].age++;
            }
        }
        if (!alreadyAdded) {
            that.playersInRoom.push({
                name: playerName,
                id: playerId,
                age: 0
            });
        }
        var j = 0;
        while (j < that.playersInRoom.length) {
            while (j < that.playersInRoom.length && that.playersInRoom[j].age >= 1) {
                that.playersInRoom.splice(j, 1);
            }
            j++;
        }
    };

    this.Challenge = function (player) {
        var challengeId = Math.random() + "";

        that.challenges.push({
            challengerName: that.page.name,
            challengeId: challengeId,
            challengeeId: player.id,
            challengerId: that.id,
            status: "Sent",
            challengeeName: player.name
        });
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "Challenge",
            challengee: player.name,
            challengeeId: player.id,
            challengerId: that.id,
            challengerName: that.page.name,
            challengeId: challengeId
        });
        // todo timeout and then remove from list and notify
        setTimeout(function () {
            var removePlayer = false;

            for (var i = 0; i < that.challenges.length; i++) {
                if (that.challenges[i].challengeId === challengeId) {
                    if (that.challenges[i].status === "Sent") {
                        removePlayer = true;
                        that.challenges.status = "Expired";
                        g.services.timeoutService.$timeout(function () { });
                    }
                }
            }
            if (removePlayer === true) {
                for (i = 0; i < that.playersInRoom.length; i++) {
                    if (that.playersInRoom[i].id === player.id) {
                        that.playersInRoom.splice(i, 1);
                        g.services.timeoutService.$timeout(function () { });
                    }
                }
            }
        }, 5000);

    };

    this.AcceptChallenge = function (challenge) {
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "Challenge Accepted",
            challengeId: challenge.challengeId,
            challengeeId: challenge.challengeeId,
            challengerId: challenge.challengerId
        });
        that.RemoveChallenge(challenge);

        var oppo = null;
        if (challenge.challengeeId === that.id) {
            oppo = challenge.challengerName;
        } else {
            oppo = challenge.challengeeName;
        }
        that.games.push(that.makeGame(oppo, challenge.challengeId,false));
    };

    this.LeaveGame = function (game) {
        for (var i = 0; i < that.games.length; i++) {
            if (game.gameId === that.games[i].gameId) {
                that.games.splice(i, 1);
            }
        }
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "Left Game",
            gameId: game.gameId,
            playerId: that.id
        });
    };

    this.LeaveAbandonedGame = function (game) {
        for (var i = 0; i < that.games.length; i++) {
            if (game.gameId === that.games[i].gameId) {
                that.games.splice(i, 1);
            }
        }
    };


    // look at this name!
    // how helpful
    // make game
    this.makeGame = function (oppo, gameId, yourTurn) {
        var hand = that.scottLeviHand.getHand();
        // here!
        // to make an object
        // the syntac is {}
        // if you want an empty object you write "var x= {}"
        
        return { // this is our game object
            IsYourTurn: yourTurn, // here is your turn

            // new syntax, just follow the pattern "name:value,"
            // here we just put the starting value 
            // yeah
            // I think it safe to assume it is 0
            // we are creating a new game 
            // no one has won any tricks yet

            // oh! also we probably need 2
            // your tricks
            // their tricks
            // ��
            // i tried to type an emjo and live share crashed
            // it was thumb up
            // now we need to update our html
            // since we added another counter
            // and changed our names
            // lead the way
            yourTricks: 0,
            yourOppoTricks: 0,
            oppo: oppo, // here is opponent
            inPlay: [], // here is the list of cards in play
            alone: false, // here is "alone", this tells us if we are alone in the game, aka has the other player left the game
            hand: hand, // more stuff....
            gameId: gameId,
            play: function (card) {
                // shall we test?

                if (this.IsYourTurn !== true) {
                    return;
                }
                
                // this is the code where you play a card.

                // this line displays the card
                this.inPlay.push({ card: card, playedBy: that.page.name });

                // this sends a message to the other play to let them know you played a card
                g.services.SingnalRService.Send(that.key, {
                    module: that.getId(),
                    type: "Played Card",
                    gameId: gameId,
                    cardId: card.guid,
                    playerId: that.id,
                    playedBy: that.page.name
                });

                // and this removes the card from our hand
                // it goes through all the cards in your hand
                for (var i = 0; i < hand.length; i++) {
                    // finds the one that has the same id as the card played 
                    // look at this if
                    if (hand[i].guid === card.guid) {
                        // and removes it 
                        hand.splice(i, 1);
                    }
                }

                // so what was the issue
                // and why did "this." fix it 
                // somethings
                // uhh

                // somehow this. is telling it where to look for IsYourTurn
                // but why we need a this I am not totally sure
                // but yeah you got the gist

                // let's not let players play when it is not there turn next
                // oh actual
                // we are tracking turns wrong
                // it is not just ABABAB
                // if you win you lead
                // let's
                // well
                // let's block play when it is not your turn anyway
                
                this.IsYourTurn = false;    
 
                g.services.timeoutService.$timeout(function () { });
            }
        };
    };

    this.RejectChallenge = function (challenge) {
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "Challenge Rejected",
            challengeId: challenge.challengeId,
            challengeeId: challenge.challengeeId,
            challengerId: challenge.challengerId
        });
        that.RemoveChallenge(challenge);
    };

    this.RevokeChallenge = function (challenge) {
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "Challenge Revoked",
            challengeId: challenge.challengeId,
            challengeeId: challenge.challengeeId,
            challengerId: challenge.challengerId
        });
        that.RemoveChallenge(challenge);
    };

    this.RemoveChallenge = function (challenge) {
        for (var i = 0; i < that.challenges.length; i++) {
            var target = that.challenges[i];
            if (target.challengeId === challenge.challengeId) {
                that.challenges.splice(i, 1);
            }
        } 
    };

    this.OnNewCharacter = function () { };

    this.OnSave = function () { };

    this.OnLoad = function () { };

    this.OnUpdate = function () { };

    this.getRequires = function () {
        return ["scott-levi-cards", "wanderer-core-save"];
    };


    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.canClose = function () {
        return true;
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Hearts";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ScottLeviHearts.component);