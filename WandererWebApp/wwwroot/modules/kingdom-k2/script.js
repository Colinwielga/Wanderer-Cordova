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
    };
    this.OnNewCharacter = function () {

        // {}
        var fallbackEntity = g.SharedEntity.MakeTrackedEntity();
        // { playerVotes: [] }
        //var playerVotes = 
        fallbackEntity.SetSet("playerVotes");  
        // {playerVotes: [{}]} 
        //this.ourPlayer = playerVotes.AddObject();
        // {playerVotes: [{name:"scott"}]}
        //this.ourPlayer.SetString("name", "scott");
        // {playerVotes: [{name:"scott", votes: 100}]}
        //this.ourPlayer.SetNumber("votes", 100); 
        // {playerVotes: [{name:"scott", votes: 100},{}]}
        //var ourNextPlayer = playerVotes.AddObject();
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin"}]}
        //ourNextPlayer.SetString("name", "colin");
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}]}
        //ourNextPlayer.SetNumber("votes", 100);

        // { activeBills: [] }
        // var activeBills =
        fallbackEntity.SetSet("activeBills");  
        // {activeBills: [{}]} 
        //var ourBill = activeBills.AddObject();
        // {activeBills: [{name:"declare war on the natives"}]}
        //ourBill.SetString("name", "declare war on the natives");
        // {activeBills: [{name:"declare war on the natives", opposing:0}]}
        //ourBill.SetNumber("opposing", 0); 
        // {activeBills: [{name:"declare war on the natives", opposing:0, supporting:0}]}
        //ourBill.SetNumber("supporting", 0);
        // {activeBills: [{name:"declare war on the natives", opposing:0, supporting:0},{}]}
        //var ourNextBill = activeBills.AddObject();
        //ourNextBill.SetString("name", "arrest courderoy");
        //ourNextBill.SetNumber("opposing", 0);
        //ourNextBill.SetNumber("supporting", 0);
        
        // var proposedBills =
        fallbackEntity.SetSet("proposedBills");
        //var billProposal = proposedBills.AddObject();
        //billProposal.SetString("name", "ally with the Empire");
        //billProposal.SetNumber("support", 1);
        //var nextProposedBill = proposedBills.AddObject();
        //nextProposedBill.SetString("name", "make momentus king");
        //nextProposedBill.SetNumber("support", 0);

        //this.enactedBills = this.trackedEntity.SetSet("enactedBills");
        //var enactLaw = this.enactedBills.AddObject();
        //enactLaw.SetString("name", "Large subsidy for newspaper industry");
        
        //  {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supporting: 100, opposing: 100},{name:"kill the empire", supporting: 100, opposing: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }
        
        // TODO standarize on supporting or support

        // update the entitys
        var that = this;
        g.services.SignalRService.SubscribeToEntity("D77A54E8-77ED-4F5D-A61D-B2BFF6F7B9B7", "8B4EE593-BF96-4A18-80DA-8A8BE40F949D", fallbackEntity.entityChanges.GetEntityChanges() , function (key1,key2,payload){
            g.services.timeoutService.$timeout(function () {
                if (that.trackedEntity === undefined) {
                    that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2)
                } else {
                    that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2);
                }
             });
         });
    };
    
    this.proposeBill = function () {
        //if (this.ourPlayer.backing.votes.backing > 0) {
            var offerBill = this.trackedEntity.backing.proposedBills.AddObject();
            offerBill.SetString("name", this.proposedBillText);
            offerBill.SetNumber("support", 1);
        //    this.ourPlayer.backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        //}
    };

    this.forProposedBill = function (proposal) {
        //if (this.ourPlayer.backing.votes.backing > 0) {
            proposal.backing.support.Add(1);
        //    this.ourPlayer.backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        //}
    };

    this.forActiveBill = function (bill) {
        //if (this.ourPlayer.backing.votes.backing > 0) {
            bill.backing.supporting.Add(1);
        //    this.ourPlayer.backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        //}
    };

    this.againstActiveBill = function (bill) {
        //if (this.ourPlayer.backing.votes.backing > 0) {
            bill.backing.opposing.Add(1);
        //    this.ourPlayer.backing.votes.Add(-1);
            this.trackedEntity.entityChanges.Publish();
        //}
    };

    this.endSession = function () {

        // take passing bills and add them to active
        for (var passingBill of this.trackedEntity.backing.activeBills.backing){
            if (passingBill.backing.supporting.backing > passingBill.backing.opposing.backing) {
                var enactLaw = this.trackedEntity.backing.enactedBills.AddObject();
                enactLaw.SetString("name", passingBill.backing.name.backing );    
            };
        }

        // clear active, 
        this.trackedEntity.backing.activeBills.Clear();    
        //then top five proposed bills move to active   

        this.trackedEntity.backing.proposedBills.backing.sort(function(a, b) {
            var supportA = a.support;
            var supportB = b.support;
            if (supportA < supportB) { 
                return 1; 
            }
            if (supportA > supportB) {
                return -1; 
            }
            return 0 ;
        });

        // 3
        var billsToActivate = this.trackedEntity.backing.proposedBills.backing.length;

        for (var i = 0; i < 5 && i < billsToActivate; i++){
            var newBills = this.trackedEntity.backing.activeBills.AddObject(); 
            newBills.SetString("name", this.trackedEntity.backing.proposedBills.backing[i].backing.name.backing);
            newBills.SetNumber("opposing", 0);
            newBills.SetNumber("supporting", 0);
        }
        
        this.trackedEntity.backing.proposedBills.Clear(); 
        //  {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supporting: 100, opposing: 100},{name:"kill the empire", supporting: 100, opposing: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }


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