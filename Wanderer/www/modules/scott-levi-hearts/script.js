var ScottLeviHearts = {};

ScottLeviHearts.component = function () {
    this.groupName = "";
    this.joined = false;
    this.playersInRoom = [];
    this.challenges = [];
    this.games = [];
    var that = this;

    this.getId = function () {
        return "scott-levi-hearts"
    }

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
        this.page = page;
        this.key = Math.random() + "";
        this.id = Math.random() + "";
    }

    this.Join = function () {
        g.services.SingnalRService.setCallback(this.key,
            this.groupName,
            function (x) { return true; },
            function (message) {
                console.log("got message:", message);
                if (message.type == "joined Game") {
                    if (message.id != that.id) {
                        g.services.timeoutService.$timeout(function () {
                            that.playersInRoom.push({
                                name: message.name,
                                id: message.id,
                            });
                        });
                        g.services.SingnalRService.Send(that.key, {
                            type: "In Room",
                            name: that.page.name,
                            id: that.id,
                        });
                    }
                } else if (message.type == "In Room") {
                    if (message.id != that.id) {
                        g.services.timeoutService.$timeout(function () {
                            that.playersInRoom.push({
                                name: message.name,
                                id: message.id,
                            });
                        });
                    }
                } else if (message.type == "Challenge") {
                    if (message.challengeeId == that.id) {
                        g.services.timeoutService.$timeout(function () {
                            that.challenges.push({
                                challengerName: message.challengerName,
                                status: "Open",
                                challengeId: message.challengeId,
                                challengeeId: message.challengeeId,
                                challengerId: message.challengerId,
                            });
                        });
                        g.services.SingnalRService.Send(that.key, {
                            type: "Challenge Recived",
                            challengerName: that.page.challengerName,
                            challengerId: message.challengerId,
                            challengeId: message.challengeId,
                        });
                    }
                } else if (message.type == "Challenge Recived") {
                    if (message.challengerId == that.id) {
                        for (var i = 0; i < that.challenges.length; i++) {
                            var target = that.challenges[i];
                            if (target.challengeId == message.challengeId) {
                                target.status = "Received";
                                g.services.timeoutService.$timeout(function () {
                                });
                            }
                        }
                    }
                } else if (message.type == "Challenge Rejected") {
                    if (message.challengerId == that.id) {
                        for (var i = 0; i < that.challenges.length; i++) {
                            var target = that.challenges[i];
                            if (target.challengeId == message.challengeId) {
                                target.status = "Rejected";
                                g.services.timeoutService.$timeout(function () {
                                });
                            }

                        }
                    }
                } else if (message.type == "Challenge Revoked") {
                    if (message.challengeeId == that.id) {
                        for (var i = 0; i < that.challenges.length; i++) {
                            var target = that.challenges[i];
                            if (target.challengeId == message.challengeId) {
                                target.status = "Revoked";
                                g.services.timeoutService.$timeout(function () {
                                });
                            }
                        }
                    }
                }
            });
        g.services.SingnalRService.Join(this.groupName, this.key);
        g.services.SingnalRService.Send(that.key, {
            type: "joined Game",
            name: that.page.name,
            id: that.id,
        });
        this.joined = true;
    }

    this.Challenge = function (player) {
        var challengeId = Math.random() + "";

        that.challenges.push({
            challengerName: that.page.name,
            challengeId: challengeId,
            challengeeId: player.id,
            challengerId: that.id,
            status: "Sent",
            challengeeName: player.name,
        });
        g.services.SingnalRService.Send(that.key, {
            type: "Challenge",
            challengee: player.name,
            challengeeId: player.id,
            challengerId: that.id,
            challengerName: that.page.name,
            challengeId: challengeId,
        });
        // todo timeout and then remove from list and notify
        setTimeout(function () {
            var removePlayer = false;
            for (var i = 0; i < that.challenges.length; i++) {
                if (that.challenges[i].challengeId == challengeId) {
                    if (that.challenges[i].status == "Sent") {
                        removePlayer = true;
                        that.challenges.status = "Expired";
                        g.services.timeoutService.$timeout(function () { });
                    }
                }
            }
            if (removePlayer == true) {
                for (var i = 0; i < that.playersInRoom.length; i++) {
                    if (that.playersInRoom[i].id == player.id) {
                        that.playersInRoom.splice(i, 1);
                        g.services.timeoutService.$timeout(function () { });
                    }
                }
            }
        }, 5000);

    }

    this.AcceptChallenge = function (challenge) {
    }

    this.RejectChallenge = function (challenge) {
        g.services.SingnalRService.Send(that.key, {
            type: "Challenge Rejected",
            challengeId: challenge.challengeId,
            challengeeId: challenge.challengeeId,
            challengerId: challenge.challengerId,
        });
        that.RemoveChallenge(challenge);
    }

    this.RevokeChallenge = function (challenge) {
        g.services.SingnalRService.Send(that.key, {
            type: "Challenge Revoked",
            challengeId: challenge.challengeId,
            challengeeId: challenge.challengeeId,
            challengerId: challenge.challengerId,
        });
        that.RemoveChallenge(challenge);
    }

    this.RemoveChallenge = function (challenge) {
        for (var i = 0; i < that.challenges.length; i++) {
            var target = that.challenges[i];
            if (target.challengeId == challenge.challengeId) {
                that.challenges.splice(i, 1);
            }
        }
    }

    this.OnNewCharacter = function () { }

    this.OnSave = function () { }

    this.OnLoad = function () { }

    this.OnUpdate = function () { }

    this.getRequires = function () {
        return [];
    }


    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }

    this.canClose = function () {
        return true;
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "Hearts";
    }

    this.OnNewCharacter();
}

g.services.componetService.registerCharacter(ScottLeviHearts.component);