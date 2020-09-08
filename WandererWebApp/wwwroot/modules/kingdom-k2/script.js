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
            "8B4EE593-BF96-4A18-80DA-8A8BE40F949A",// prod is "8B4EE593-BF96-4A18-80DA-8A8BE40F949D",
            fallbackEntity.entityChanges.GetEntityChanges(), function (key1, key2, payload) {
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
            this.GetOurPlayer().backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
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

    this.endSession = function () {

        if (this.trackedEntity.backing.enactedBills === undefined) {
           this.trackedEntity.SetSet("enactedBills"); 
        }

        
        // take passing bills and add them to active
        for (var activeBill of this.trackedEntity.backing.activeBills.backing){
            if (activeBill.backing.supporting.backing > activeBill.backing.opposing.backing) {
                console.log(activeBill);
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
        // id is:
        // this.trackedEntity.backing.proposedBills.backing[i].id
        // to remove
        // this.trackedEntity.backing.proposedBills.Remove(id )
        // this.trackedEntity.backing.proposedBills.Clear(); 
        //  {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supporting: 100, opposing: 100},{name:"kill the empire", supporting: 100, opposing: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }

        for (var player of this.trackedEntity.backing.playerVotes.backing) {
            player.SetNumber("votes", 25);
        }

        this.trackedEntity.entityChanges.Publish();
        
    };

    this.showPlayers = true;
    this.showActiveBills = true;
    this.showProposedBills = true;
    this.showEnactedBills = true;

    this.toggleShowPlayers = function () {
        if (this.showPlayers === false) {
            this.showPlayers = true            
        } else {
            this.showPlayers = false
        }
    };
    this.toggleShowActiveBills = function () {
        if (this.showActiveBills === false) {
            this.showActiveBills = true            
        } else {
            this.showActiveBills = false
        }
    };
    this.toggleShowProposedBills = function () {
        if (this.showProposedBills === false) {
            this.showProposedBills = true            
        } else {
            this.showProposedBills = false
        }
    };
    this.toggleShowEnactedBills = function () {
        if (this.showEnactedBills === false) {
            this.showEnactedBills = true            
        } else {
            this.showEnactedBills = false
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