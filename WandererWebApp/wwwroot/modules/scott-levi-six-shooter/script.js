var ScottLeviSixShooter = {};

ScottLeviSixShooter.component = function () {
    this.actionName=""
    this.hitPointsCounter = {name: "HP", value: 6.0};
    this.actionPointsCounter = {name: "AP", value: 6.0};
    this.confidenceCounter = {name: "confidence", value: 6.0};
    this.counterList = [this.hitPointsCounter, this.actionPointsCounter, this.confidenceCounter];

    this.simpleAction = {name:"take an action", subActions: [{counterName: "AP", value: -1.0}], subActionCounter: undefined, subActionValue: 0};

    this.injuryAction = {name:"injury", subActions: [{counterName: "HP", value: -1.0}], subActionCounter: undefined, subActionValue: 0};
    this.loseConfidence = {name:"lose confidence", subActions: [{counterName: "confidence", value: -1.0},], subActionCounter: undefined, subActionValue: 0};
    this.gainConfidence = {name:"gain confidence", subActions: [{counterName: "confidence", value: +1.0}], subActionCounter: undefined, subActionValue: 0};

    this.actionList = [this.plusHPAction, this.simpleAction, this.injuryAction, this.loseConfidence, this.gainConfidence];

    this.applyAction = function (action) {
        console.log("applyAction applied")
        for (var i = 0; i < action.subActions.length; i++){
            var subAction = action.subActions[i];

            // we need to find the counter we want to modify
            // so we go through the list and find the one with a matching name
            for (var j = 0; j < this.counterList.length; j++){
                var counter = this.counterList[j];
                
                // have we found the right one
                if (subAction.counterName == counter.name){
                    counter.value = counter.value + subAction.value;
                };
            };
        };
    };

    this.addSubActionToAction = function (action) { 

        // action is:
        // - name : string
        // - subActions : list of sub-actions 
        // - subActionCounter : counter
        // - subActionValue : number 
        // action.subActionCounter is
        // - name: string
        // - value: number
        action.subActions.push({counterName: action.subActionCounter.name, value: action.subActionValue});
    };

    this.createAction = function (actionName) {
        this.actionList.push({name: actionName, subActions: []});
    };

    this.createCounter = function () {
        this.counterList.push({name: counterName, value: ""})
    };
    
    this.deleteAction = function (action) {
        for (var i = 0; i < this.actionList.length; i++){
            var actionListed = this.actionList[i];
            if (actionListed == action){
                this.actionList.splice(i, 1);
            }  
        }
    };
    
    this.deleteSubAction = function (subAction) {
        for (var i = 0; i < this.actionList.length; i++){
            var actionListed = this.actionList[i];
            for (var j = 0; j < actionListed.subActions.length; j++){
                var subActionListed = actionListed.subActions[j];
                if (subActionListed == subAction){
                    actionListed.subActions.splice(j, 1);
                }
            }    
        }
    }; 

    this.getId = function () {
        return "scott-levi-six-shooter";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.logger = logger;
    };
    
    this.OnNewCharacter = function () {
    
    };
    
    this.OnSave = function () {
        // this.communicator.write("hitPoints", this.hitPoints)
    };
     
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            // if (this.communicator.canRead("character moves")) {
            //     this.characterMoves = this.communicator.read("character moves");
            // }
            // if (this.communicator.canRead("minus ability")) {
            //     this.minusAbility = this.communicator.read("minus ability");
            // }    
        };
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
    this.getHmtl = function () {
        return "modules/scott-levi-six-shooter/page.html"
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
        return "Six Shooter";
    };

    this.getSystem = function () {
        return "Six Shooter"
    };

};

g.services.componetService.registerCharacter(ScottLeviSixShooter.component);

//directional choices
//upstream or downstream
//uphill or downhill
//towards a point of interest or away from a point of interest

//name Qwi (for now)
//supernatural crystals
//ICS

//crabfolk share a common spoken language, but each tribe has a unique signing and movement based language 
//nomadic giant milipede riders
//pearl farmers
//order of the silver flame
//
