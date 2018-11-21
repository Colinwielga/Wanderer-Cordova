var ScottLeviHearts = {};

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
                            // look here! idk if you know this notation that.games[i] 
                            // but the word games here is a pretty big clue target is a game
                            // anyway.. back to your changes
                            // i think you were in the middle of things before I started quizing
                            target = that.games[i];
                            // check to make sure the other player played the caed
                            if (target.gameId === message.gameId && message.playerId !== that.id) {
                                // yeah sure
                                // pretty key to know that

                                // I am going to put that comment in the method so you have it
                                target.putCardInPlay({
                                    module: that.getId(),
                                    card: that.scottLeviHand.getCard(message.cardId),
                                    playedBy: message.playedBy 
                                });
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
    
    this.makeGame = function (oppo, gameId, yourTurn) {
        var hand = that.scottLeviHand.getHand();
        return { 
            IsYourTurn: yourTurn, 
            yourTricks: 0,
            yourOppoTricks: 0,
            oppo: oppo, 
            inPlay: [], 
            alone: false, 
            hand: hand, 
            gameId: gameId,

            putCardInPlay: function (cardInfo) {
                // when there are two cards already out
                // clear the table a start a new trick
                if (this.inPlay.length == 2) {
                    this.inPlay = [];
                }

                // when there are no cards out
                // managing turn is simple
                // if you played the card it is their turn
                // if they played the card it is your turn
                if (this.inPlay.length == 0) {

                    if (that.page.name === cardInfo.playedBy) {
                        this.IsYourTurn = false;
                    }

                    if (that.page.name !== cardInfo.playedBy) {
                        this.IsYourTurn = true;
                    }
                } else {
                    // if there is already a card on the table
                    // we need to determine who will lead for the next trick

                    // first we determine who played what card
                    var yourCard = null;
                    var theirCard = null;
                    if (that.page.name === cardInfo.playedBy) {

                        yourCard = cardInfo.card;
                        theirCard = this.inPlay[this.inPlay.length - 1].card;
                    }
                    else {
                        yourCard = this.inPlay[this.inPlay.length - 1].card;
                        theirCard = cardInfo.card;
                    }

                    // the player with the higher card leads the next trick
                    if (yourCard.getValue() > theirCard.getValue()) {
                        this.yourTricks = this.yourTricks + 1;
                        this.IsYourTurn = true;
                    } else if (yourCard.getValue() === theirCard.getValue()) {
                        if (this.IsYourTurn === true) {
                            this.IsYourTurn = false;
                        }
                        else
                        {
                            this.IsYourTurn = true;
                        }
                    } else {
                        this.yourOppoTricks = this.yourOppoTricks + 1;
                        this.IsYourTurn = false;
                    }
                }

                this.inPlay.push(cardInfo);
                
                g.services.timeoutService.$timeout(function () { });
            
            },
            play: function (card) {
                if (this.IsYourTurn !== true) {
                    return;
                }
                
                this.putCardInPlay( 
                    {
                        card: card, 
                        playedBy: that.page.name
                    });

                // this sends a message to the other play to let them know you played a card
                g.services.SingnalRService.Send(that.key, {
                    module: that.getId(),
                    type: "Played Card",
                    gameId: gameId,
                    cardId: card.guid,
                    playerId: that.id,
                    playedBy: that.page.name
                });

                for (var i = 0; i < hand.length; i++) {
                    if (hand[i].guid === card.guid) {
                        hand.splice(i, 1);
                    }
                }
                
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