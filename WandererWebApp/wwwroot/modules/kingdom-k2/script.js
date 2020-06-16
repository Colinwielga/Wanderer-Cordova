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

        //  {
        //      playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}] 
        //      activeBills: [{name:"kill the lizard people", supportingVotes: 100, opposingVots: 100},{name:"kill the empire", supportingVotes: 100, opposingVots: 100}]
        //      proposedBills: [{name:"make monmentous king", support: 100},{name:"make monmentous emperor", support: 100}]
        //  }
        

    };
    
    this.proposeBill = function () {
        if (this.ourPlayer.backing.votes.backing > 0) {

            var offerBill = this.proposedBills.AppendObject();
            offerBill.SetString("name", this.proposedBillText);
            offerBill.SetNumber("support", 1);
            this.ourPlayer.backing.votes.Add(-1);
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