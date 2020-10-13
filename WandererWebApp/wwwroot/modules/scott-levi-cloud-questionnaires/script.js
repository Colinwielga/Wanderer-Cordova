var ScottLeviCloudQuestionnaires = {};

ScottLeviCloudQuestionnaires.component = function () {
    this.cloudQuestionnaires = "";

    this.getId = function () {
        return "scott-levi-cloud-questionnaires";
    };

    
    this.getSystem = function () {
        return "Qualitative Outcomes"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.ledgerPublic = dependencies[0];
        this.logger = logger;
    };

    this.OnNewCharacter = function () { 
        this.cloudImmigrationQuestion1 = "";
        this.cloudImmigrationQuestion2 = "";
        this.cloudImmigrationQuestion3 = "";
        this.cloudPrisonQuestion1 = "";
        this.cloudPrisonQuestion2 = "";
        this.cloudPrisonQuestion3 = "";
        this.cloudTaskForceQuestion1 = "";
        this.hand = [];
        
    };

    this.OnSave = function () { 
        this.communicator.write("cloud immigration question1", this.cloudImmigrationQuestion1);
        this.communicator.write("cloud immigration question2", this.cloudImmigrationQuestion2);
        this.communicator.write("cloud immigration question3", this.cloudImmigrationQuestion3);
        this.communicator.write("cloud prison question1", this.cloudPrisonQuestion1);
        this.communicator.write("cloud prison question2", this.cloudPrisonQuestion2);
        this.communicator.write("cloud prison question3", this.cloudPrisonQuestion3);
        this.communicator.write("cloud task force question1", this.cloudTaskForceQuestion1);
        
        this.communicator.write("hand", this.hand);
    };

    this.OnLoad = function () { 
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("cloud immigration question1")) {
                this.cloudImmigrationQuestion1 = this.communicator.read("cloud immigration question1");
            }
            if (this.communicator.canRead("cloud immigration question2")) {
                this.cloudImmigrationQuestion2 = this.communicator.read("cloud immigration question2");
            }
            if (this.communicator.canRead("cloud immigration question3")) {
                this.cloudImmigrationQuestion3 = this.communicator.read("cloud immigration question3");
            }
            if (this.communicator.canRead("cloud prison question1")) {
                this.cloudPrisonQuestion1 = this.communicator.read("cloud prison question1");
            }
            if (this.communicator.canRead("cloud prison question2")) {
                this.cloudPrisonQuestion2 = this.communicator.read("cloud prison question2");
            }
            if (this.communicator.canRead("cloud prison question3")) {
                this.cloudPrisonQuestion3 = this.communicator.read("cloud prison question3");
            }
            if (this.communicator.canRead("cloud task force question1")) {
                this.cloudTaskForceQuestion1 = this.communicator.read("cloud task force question1");
            }
            if (this.communicator.canRead("hand")) {
                this.hand = this.communicator.read("hand");
            }
        }
    };

    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        return ["wanderer-core-ledger"];
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
        return "Cloud Questionnaire";
    };
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };
    // this returns something like:
    // {
    //  success : 30,
    //  failure : 40,
    //  indeterminate : 30
    // }
    this.generateQualCard = function() {
        var indeterminate = this.nicerRandom(0,50);
        var success = this.nicerRandom(0,100-indeterminate)
        var failure = this.nicerRandom(0,100-(indeterminate+success))  

        // var qualCard = { 
        //     failure: 30,
        //     name: "scott"
        //  }

        var qualCard = {
            indeterminate: indeterminate,  
            success: success,   
            failure: failure, 
        } 
        return qualCard;
    }
    
    // this.nicerRandom(0,100)
    // returns a number between low and high
    this.nicerRandom = function(low, high){
        return Math.round((Math.random()*(high - low)) +low);
    }

    this.draw = function () {
        var qualCard = this.generateQualCard();
        this.hand.push(qualCard);
    };

    this.discard = function (card) {
        var index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);

            this.logger.infoWithAction("Undo Discard?", "undo", function(){
                this.hand.push(card);
            });

            this.ledgerPublic.PublicSendMessage("discarded" + card.indeterminate + "/" + card.success + "/" + card.failure);
        };
    };

    this.getDC = function (outcome) {
        return ColinWielgaRoll.getDC(outcome);
    }

    this.OnNewCharacter();

};

g.services.componetService.registerCharacter(ScottLeviCloudQuestionnaires.component);