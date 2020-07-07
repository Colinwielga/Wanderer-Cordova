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
        this.trackedEntity = g.SharedEntity.MakeTrackedEntity();
        // { playerVotes: [] }
        var playerVotes = this.trackedEntity.SetList("playerVotes");  
        // {playerVotes: [{}]} 
        this.ourPlayer = playerVotes.AppendObject();
        // {playerVotes: [{name:"scott"}]}
        this.ourPlayer.SetString("name", "scott");
        // {playerVotes: [{name:"scott", votes: 100}]}
        this.ourPlayer.SetNumber("votes", 100); 
        // {playerVotes: [{name:"scott", votes: 100},{}]}
        var ourNextPlayer = playerVotes.AppendObject();
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin"}]}
        ourNextPlayer.SetString("name", "colin");
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}]}
        ourNextPlayer.SetNumber("votes", 100);

        // { activeBills: [] }
        var activeBills = this.trackedEntity.SetList("activeBills");  
        // {activeBills: [{}]} 
        var ourBill = activeBills.AppendObject();
        // {activeBills: [{name:"declare war on the natives"}]}
        ourBill.SetString("name", "declare war on the natives");
        // {activeBills: [{name:"declare war on the natives", opposing:0}]}
        ourBill.SetNumber("opposing", 0); 
        // {activeBills: [{name:"declare war on the natives", opposing:0, supporting:0}]}
        ourBill.SetNumber("supporting", 0);
        // {activeBills: [{name:"declare war on the natives", opposing:0, supporting:0},{}]}
        var ourNextBill = activeBills.AppendObject();
        ourNextBill.SetString("name", "arrest courderoy");
        ourNextBill.SetNumber("opposing", 0);
        ourNextBill.SetNumber("supporting", 0);
        
        this.proposedBills = this.trackedEntity.SetList("proposedBills");
        var billProposal = this.proposedBills.AppendObject();
        billProposal.SetString("name", "ally with the Empire");
        billProposal.SetNumber("support", 1);
        var nextProposedBill = this.proposedBills.AppendObject();
        nextProposedBill.SetString("name", "make momentus king");
        nextProposedBill.SetNumber("support", 0);

        this.enactedBills = this.trackedEntity.SetList("enactedBills");
        var enactLaw = this.enactedBills.AppendObject();
        enactLaw.SetString("name", "Large subsidy for newspaper industry");
        
        //  {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supporting: 100, opposing: 100},{name:"kill the empire", supporting: 100, opposing: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }
        
        // TODO standarize on supporting or support

        // update the entitys
        // var that = this;
        // g.services.SignalRService.SubscribeToEntity("12345","54321", function (key1,key2,payload){
        //     g.services.timeoutService.$timeout(function(){
        //         that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(key1,key2,payload);
        //     });
        // });

    };
    
    this.proposeBill = function () {
        if (this.ourPlayer.backing.votes.backing > 0) {
            var offerBill = this.proposedBills.AppendObject();
            offerBill.SetString("name", this.proposedBillText);
            offerBill.SetNumber("support", 1);
            this.ourPlayer.backing.votes.Add(-1);
        }
    };

    this.forProposedBill = function (proposal) {
        if (this.ourPlayer.backing.votes.backing > 0) {
            proposal.backing.support.Add(1);
            this.ourPlayer.backing.votes.Add(-1);
        }
    };

    this.forActiveBill = function (bill) {
        if (this.ourPlayer.backing.votes.backing > 0) {
            bill.backing.supporting.Add(1);
            this.ourPlayer.backing.votes.Add(-1);
        }
    };

    this.againstActiveBill = function (bill) {
        if (this.ourPlayer.backing.votes.backing > 0) {
            bill.backing.opposing.Add(1);
            this.ourPlayer.backing.votes.Add(-1);
        }
    };

    this.endSession = function () {
        // this.trackedEntity = {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supportingVotes: 100, opposingVots: 100},{name:"kill the empire", supportingVotes: 100, opposingVots: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }
        // + a lot of ".backing"

        for (var passingBill of this.trackedEntity.backing.activeBills.backing){
            if (passingBill.backing.supporting.backing > passingBill.backing.opposing.backing) {
                var enactLaw = this.enactedBills.AppendObject();
                enactLaw.SetString("name", passingBill.backing.name.backing );    
            };
        }
        //TODO clear active, then top five proposed bills move to active        
        //clear(this.trackedEntity.backing.activeBills.backing)
        //this.trackedEntity.backing.proposedBills.backing[0,1,2,3,4]
        //var enactLaw = this.enactedBills.AppendObject();
        //enactLaw.SetString("name", pro);
        
        }
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