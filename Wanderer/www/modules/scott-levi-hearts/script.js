var ScottLeviHearts = {};

ScottLeviHearts.component = function () {
    this.groupName = "";
    this.joined = false;
    this.playersInRoom = [];
    this.challenges = [];
    this.games = [];
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

    this.Join = function () {
        g.services.SingnalRService.setCallback(this.key,
            this.groupName,
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
                                g.services.timeoutService.$timeout(function () {});
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
                                that.games.push(that.makeGame(oppo, target.challengeId));
                                that.challenges.splice(i, 1);
                                g.services.timeoutService.$timeout(function () { });
                            }
                        }
                    }
                } else if (message.type === "Played Card") {
                    for (i = 0; i < that.games.length; i++) {
                        target = that.games[i];
                        if (target.gameId === message.gameId && message.playerId !== that.id) {
                            target.inPlay.push({
                                module: that.getId(),
                                card: that.scottLeviHand.getCard(message.cardId),
                                playedBy: message.playedBy
                            });
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
        g.services.SingnalRService.Join(this.groupName, this.key);
        g.services.SingnalRService.Send(that.key, {
            module: that.getId(),
            type: "joined Game",
            name: that.page.name,
            id: that.id
        });
        this.joined = true;
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
        that.games.push(that.makeGame(oppo, challenge.challengeId));
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


    this.makeGame = function (oppo, gameId) {
        var hand = that.scottLeviHand.getHand();
        return {
            oppo: oppo,
            inPlay: [],
            alone: false,
            hand: hand,
            gameId: gameId,
            play: function (card) {
                this.inPlay.push({ card: card, playedBy: that.page.name });
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
        return ["scott-levi-cards"];
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