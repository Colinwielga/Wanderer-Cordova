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
        var ourPlayer = playerVotes.AppendObject();
        // {playerVotes: [{name:"scott"}]}
        ourPlayer.SetString("name", "scott");
        // {playerVotes: [{name:"scott", votes: 100}]}
        ourPlayer.SetNumber("votes", 100); 
        // {playerVotes: [{name:"scott", votes: 100},{}]}
        var ourNextPlayer = playerVotes.AppendObject();
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin"}]}
        ourNextPlayer.SetString("name", "colin");
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}}]}
        ourNextPlayer.SetNumber("votes", 100);


        // goal
        // {playerVotes: [{name:"scott", votes: 100},{name:"colin", votes: 100}]}


        // console.log("tackedEntity",playerVotes.backing[0].backing.name.backing)
        

        //playerVotes.backing = []
        
        // scott 
        //playerVotes[0].name

        // scott
        //playerVotes.backing[0].backing.name.backing

        // module.trackedEntity.backing.playerVotes.backing[0].backing.name.backing
        //
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