var ScottLeviCloudCards = {};

ScottLeviCloudCards.component = function () {
    this.cloudCards = "";
    var that = this;
    this.getId = function () {
        return "scott-levi-cloud-cards";
    };

    
    this.getSystem = function () {
        return "Qualitative Outcomes"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.ledgerPublic = dependencies[0];
        this.qualPublic = dependencies[1];
        this.logger = logger;

        var cardDisplayableMaker = {
            CanDisplay: function(message){
                if (message.displayerModule === that.getId()) {
                    return true;
                }
                return false;
            },
            ConvertToDisplayable: function (message) {
                return {
                    getHtml: function () { return "modules/scott-levi-cloud-cards/card.html"; },
                    getModel: function () { 
                        message.model.roll = function () {
                            that.qualPublic.publicRoll(message.model.uncertain, message.model.success); 
                        }
                        return message.model; 
                    },
                    getId: function () { return "scott-levi-cloud-cards"; }
                };
            }
        };
        this.ledgerPublic.AddDisplayableMaker(cardDisplayableMaker);
    };

    this.OnNewCharacter = function () { 
        this.hand = [];
        
    };

    this.OnSave = function () {    
        this.communicator.write("hand", this.hand);
    };

    this.OnLoad = function () { 
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("hand")) {
                this.hand = this.communicator.read("hand");
            }
        }
    };

    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        return ["wanderer-core-ledger", "chris-qual-outcomes"];
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
        return "Cloud Cards";
    };
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };
   
    this.generateQualCard = function() {
        var indeterminate = this.nicerRandom(0,50);
        var success = this.nicerRandom(0,100-indeterminate)
        var failure = (100-(indeterminate+success)) 

        var qualCard = {  
            success: success,   
            failure: failure, 
            indeterminate: indeterminate,
        } 
        return qualCard;
    }
    
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
                that.hand.push(card);
            });
            this.ledgerPublic.PublicSendDisplayableMessage({
                displayerModule : that.getId(), 
                model:{
                    uncertain: card.indeterminate, 
                    success: card.success, 
                    failure: card.failure, }
            });
        };
    };

    this.getDC = function (outcome) {
        return ColinWielgaRoll.getDC(outcome);
    }

    this.OnNewCharacter();

};

g.services.componetService.registerCharacter(ScottLeviCloudCards.component);