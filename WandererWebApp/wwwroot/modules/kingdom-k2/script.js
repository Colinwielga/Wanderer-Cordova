var KingdomK2 = {};

KingdomK2.component = function () {
    this.getSystem = function () {
        return "Kingdom";
    };
    this.getId = function () {
        return "kingdom-k2";
    };
    this.getTitle = function () {
        return "Voting System";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.page = page;
    };
    this.OnNewCharacter = function () {

        var fallbackEntity = g.SharedEntity.MakeTrackedEntity();
        fallbackEntity.SetSet("playerVotes");  
        fallbackEntity.SetSet("activeBills");  
        fallbackEntity.SetSet("proposedBills");
        
        // that.trackedEntity = {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supporting: 100, opposing: 100},{name:"kill the empire", supporting: 100, opposing: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }
        
        // TODO standarize on supporting or support


        // update the entitys
        var that = this;
        g.services.SignalRService.SubscribeToEntity(
            "D77A54E8-77ED-4F5D-A61D-B2BFF6F7B9B7",
            "8B4EE593-BF96-4A18-80DA-8A8BE40F949D",// prod is "8B4EE593-BF96-4A18-80DA-8A8BE40F949D",
            fallbackEntity.entityChanges.GetEntityChanges(), 
            function (key1, key2, payload) {
                g.services.timeoutService.$timeout(function () {
                    if (that.trackedEntity === undefined) {
                        that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2);
                        
                        // check if tracked entity has a player that represents us
                        // if it does we are done
                        // if it does not, make
                        for (var player of that.trackedEntity.backing.playerVotes.backing) {
                            var localPlayerId = that.page.accessKey;
                            if (player.backing.id.backing === localPlayerId)  {
                                return;
                            }
                        }
                        var ourPlayer = that.trackedEntity.backing.playerVotes.AddObject();
                        ourPlayer.SetString("name", that.page.name ?? "");
                        ourPlayer.SetString("id",that.page.accessKey);
                        ourPlayer.SetNumber("votes", 25);
                        that.trackedEntity.entityChanges.Publish(); 

                    } else {
                        that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2);
                        var ourPlayer = that.GetOurPlayer();
                        if (that.page.name != null && ourPlayer.backing.name.backing !== that.page.name) {
                            ourPlayer.SetString("name", that.page.name);
                            that.trackedEntity.entityChanges.Publish(); 
                        }
                    }
                });
            });
    };

    this.showVoters = function (bills) {
        if (bills.show === true) {
            bills.show = false;
        }
        else if (bills.show === false) {
            bills.show = true;
        }
        
    };

    this.showVoteTallies = true;

    this.displayExpanded = function (bills) {
        if (bills.show === true){
            return " 📖 ";
        }
        else if (bills.show === false){
            return " 📘 ";
        }       
    };

    this.toggle = function (mod) {
        that.page.toggle(mod);
    };

    this.GetOurPlayer = function (){
        for (var player of this.trackedEntity.backing.playerVotes.backing) {
            var localPlayerId = this.page.accessKey;
            if (player.backing.id.backing === localPlayerId)  {
                return player;
            }
        }
    }

    this.proposeBill = function () {
        if (this.GetOurPlayer().backing.votes.backing > 0 && this.proposedBillText != null) {
            var offerBill = this.trackedEntity.backing.proposedBills.AddObject();
            offerBill.SetString("name", this.proposedBillText);
            offerBill.SetNumber("support", 1);
            offerBill.setString("proposer", this.GetOurPlayer().backing.name.backing)
            this.GetOurPlayer().backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
            this.proposedBillText = "";
        }
    };

    this.forProposedBill = function (proposal) {
        if (this.GetOurPlayer().backing.votes.backing > 0) {
            proposal.backing.support.Add(1);
            this.GetOurPlayer().backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        }
    };

    this.forActiveBill = function (bill) {
        if (this.GetOurPlayer().backing.votes.backing > 0) {
            bill.backing.supporting.Add(1);
            this.GetOurPlayer().backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        }
    };

    this.againstActiveBill = function (bill) {
        if (this.GetOurPlayer().backing.votes.backing > 0) {
            bill.backing.opposing.Add(1);
            this.GetOurPlayer().backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        }
    };

    this.passing = function (bill) {
        return Math.floor(Math.sqrt(bill.backing.supporting.backing)) > Math.floor(Math.sqrt(bill.backing.opposing.backing)) ? "👍" : "";
    }

    this.willActivate = function (proposal) {
        var count = 0;
        var equal = 0;
        for (var other of this.trackedEntity.backing.proposedBills.backing) {
            if (other != proposal) {
                if (other.backing.support.backing > proposal.backing.support.backing) {
                    count++;
                    if (count >= 5) {
                        return "";
                    }
                }

                if (other.backing.support.backing === proposal.backing.support.backing) {
                    equal++;
                }
            }
        }
        if (count + equal >= 5) {
            return "🤷‍♂️"
        }

        return "⭐";
    }

    this.sortedPlayers = function () {
        if (this.trackedEntity === undefined){
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

    this.sortedProposedBills = function () {
        var list2 = [...this.trackedEntity.backing.proposedBills.backing]
        list2.sort(function (a, b) {
            if (a.backing.support.backing > b.backing.support.backing) {
                return -1;
            } else if (a.backing.support.backing < b.backing.support.backing) {
                return 1;
            } else {
                return 0;
            }
        });
        return list2;
    }

    this.sortedActiveBills = function () {
        var list2 = [...this.trackedEntity.backing.activeBills.backing]
        list2.sort(function (a, b) {
            if (a.backing.supporting.backing + a.backing.opposing.backing > b.backing.supporting.backing + b.backing.opposing.backing) {
                return -1;
            } else if (a.backing.supporting.backing + a.backing.opposing.backing < b.backing.supporting.backing + b.backing.opposing.backing) {
                return 1;
            } else {
                return 0;
            }
        });
        return list2;
    }

    this.endSession = function () {

        if (this.trackedEntity.backing.enactedBills === undefined) {
           this.trackedEntity.SetSet("enactedBills"); 
        }

        
        // take passing bills and add them to active
        for (var activeBill of this.trackedEntity.backing.activeBills.backing){
            if (Math.floor(Math.sqrt(activeBill.backing.supporting.backing)) > Math.floor(Math.sqrt(activeBill.backing.opposing.backing))) {
                var enactLaw = this.trackedEntity.backing.enactedBills.AddObject();
                enactLaw.SetString("name", activeBill.backing.name.backing );    
            }
        }

        // clear active, 
        this.trackedEntity.backing.activeBills.Clear();    
        //then top five proposed bills move to active   

        this.trackedEntity.backing.proposedBills.backing.sort(function(a, b) {
            // a.support
            // a.backing.support.backing 
            var supportA = a.backing.support.backing;
            var supportB = b.backing.support.backing;
            if (supportA < supportB) { 
                return 1; 
            }
            if (supportA > supportB) {
                return -1; 
            }
            return 0 ;
        });

        var billsToActivate = this.trackedEntity.backing.proposedBills.backing.length;

        for (var i = 0; i < 5 && i < billsToActivate; i++){
            var newBill = this.trackedEntity.backing.activeBills.AddObject(); 
            newBill.SetString("name", this.trackedEntity.backing.proposedBills.backing[0].backing.name.backing);
            newBill.SetNumber("opposing", 0);
            newBill.SetNumber("supporting", 0);
            this.trackedEntity.backing.proposedBills.Remove(this.trackedEntity.backing.proposedBills.backing[0].id);
        }

        for (var player of this.trackedEntity.backing.playerVotes.backing) {
            player.SetNumber("votes", 25);
        }

        this.trackedEntity.entityChanges.Publish();
        
    };

    // instead of these we will categories
    //
    this.categories = {
        players : { show : true},
        activeBills : { show : true},
        proposedBills : { show : true},
        enactedBills : { show : true},
    }


    this.toggleShowCategory = function (category) {
        if (category.show === false) {
            category.show = true            
        } else {
            category.show = false
        }
    };

    this.OnSave = function () {
    };
    this.OnLoad = function () {
    };
    this.OnUpdate = function () {
    };
    this.getRequires = function () {
        return [];
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

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(KingdomK2.component);