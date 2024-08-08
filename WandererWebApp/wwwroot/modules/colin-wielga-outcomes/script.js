var ColinWielgaOutcomes = {};

ColinWielgaOutcomes.component = function () {
    this.getSystem = function () {
        return "Murder"
    };
    this.getId = function () {
        return "colin-wielga-outcomes";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.page = page;
    };

    this.OnNewCharacter = function () {
        // something like:
        //this.key = "value";

        var fallbackEntity = g.SharedEntity.MakeTrackedEntity();
        fallbackEntity.SetSet("outcomes");
        fallbackEntity.SetSet("playerVotes");  

        // update the entitys
        var that = this;
        g.services.SignalRService.SubscribeToEntity(
            "5EAD7664-404B-4D2F-9A00-7E80513F43DD",
            "529D955E-3593-433F-A8EC-EA32A40448B6",
            fallbackEntity.entityChanges.GetEntityChanges(),
            function (key1, key2, payload) {
                g.services.timeoutService.$timeout(function () {
                    if (that.trackedEntity === undefined) {
                        that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2, payload.RecentChanges[payload.RecentChanges.length - 1]);

                        // check if tracked entity has a player that represents us
                        // if it does we are done
                        // if it does not, make
                        for (var player of that.trackedEntity.backing.playerVotes.backing) {
                            var localPlayerId = that.page.accessKey;
                            if (player.backing.id.backing === localPlayerId) {
                                return;
                            }
                        }
                        var ourPlayer = that.trackedEntity.backing.playerVotes.AddObject();
                        ourPlayer.SetString("name", that.page.name ?? "");
                        ourPlayer.SetString("id", that.page.accessKey);
                        ourPlayer.SetNumber("isDM", 0);
                        ourPlayer.SetNumber("votes", 10);

                        // TODO you are here
                        var d = new Date();
                        ourPlayer.SetNumber("lastActive", d.getTime());


                        that.trackedEntity.entityChanges.Publish();

                    } else {
                        that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2, payload.RecentChanges[payload.RecentChanges.length - 1]);
                        var ourPlayer = that.GetOurPlayer();
                        if (that.page.name != null && ourPlayer.backing.name.backing !== that.page.name) {
                            ourPlayer.SetString("name", that.page.name);
                            that.trackedEntity.entityChanges.Publish();
                        }
                    }
                });
            });

    };
    this.OnSave = function () {
    };
    this.OnLoad = function () {
    };
    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        // example of a populated list:
        // return ["colin-wielga-tools"]
        return [];
    };

    this.proposeOutcome = function () {
        if (this.GetOurPlayer().backing.votes.backing >= 1 && this.proposedOutcomeText != null) {
            this.trackedEntity.backing.outcomes.AddString(this.proposedOutcomeText);
            this.GetOurPlayer().backing.votes.Add(-1);
            
            let players = [];
            let dms = [];
            for (var player of this.trackedEntity.backing.playerVotes.backing) {
                if (player.backing.isDM.backing === 0) {
                    player.push(player);
                } else {
                    dms.push(player);
                }
            }
            let dmWeight = players.length / dms.length;
            let totalWeidth = this.GetOurPlayer().backing.isDM.backing == 0 ? (players.length - 1) + (dmWeight * dms.length)
                : players.length + (dmWeight * (dms - 1));

            for (var player of players) {
                if (player.backing.id.backing !== this.page.accessKey) {
                    player.backing.votes.Add(1.0/totalWeidth);
                }
            }
            for (var dm of dms) {
                if (dm.backing.id.backing !== this.page.accessKey) {
                    dm.backing.votes.Add(dmWeight / totalWeidth);
                }
            }
            
            this.trackedEntity.entityChanges.Publish();
            this.proposedOutcomeText = "";
        }
    };

    this.sortedPlayers = function () {
        if (this.trackedEntity === undefined) {
            return [];
        }

        var list2 = [...this.trackedEntity.backing.playerVotes.backing]
        list2.sort(function (a, b) {
            if (a.backing.votes.backing > b.backing.votes.backing) {
                return -1;
            } else if (a.backing.votes.backing < b.backing.votes.backing) {
                return 1;
            } else {
                return 0;
            }
        });
        return list2;
    }

    this.clear = function () {
        this.trackedEntity.backing.outcomes.Clear();
        
        this.trackedEntity.entityChanges.Publish();
    }

    this.roll = function () {
        const winner = this.trackedEntity.backing.outcomes.backing[Math.floor(1 + Math.random() * this.trackedEntity.backing.outcomes.backing.length)].backing;
        this.trackedEntity.backing.outcomes.Clear();
        this.trackedEntity.backing.outcomes.AddString(winner);
        
        this.trackedEntity.entityChanges.Publish();
    }

    this.toggleDM = function () {
        if (this.GetOurPlayer().backing.isDM.backing == 0) {
            this.GetOurPlayer().backing.isDM.Set(1);
        } else {
            this.GetOurPlayer().backing.isDM.Set(0);
        }
        
        this.trackedEntity.entityChanges.Publish();
    }

    this.GetOurPlayer = function () {
        for (var player of this.trackedEntity.backing.playerVotes.backing) {
            var localPlayerId = this.page.accessKey;
            if (player.backing.id.backing === localPlayerId) {
                return player;
            }
        }
    }

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
        return "Outcomes";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinWielgaOutcomes.component);