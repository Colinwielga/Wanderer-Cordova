var ScottLeviCloudOfUncertainty = {};

ScottLeviCloudOfUncertainty.component = function () {

    // all component need a unique ID
    this.getId = function () {
        return "scott-levi-cloud-of-uncertainty";
    };

    this.getSystem = function () {
        return "Qualitative Outcomes"
    };
        
    this.increase = function () {
        this.uncertaintyLevels = this.uncertaintyLevels + 1;
           
    };   
    
    this.decrease = function () {
        this.uncertaintyLevels = this.uncertaintyLevels - 1;
        
    };

    this.uncertainty = function () {
        return  this.uncertaintyLevels * 2.5; 
    } 
    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.uncertaintyLevels = 1;
    };
    // called when a character is saved
    this.OnSave = function () {
        this.communicator.write("uncertaintyLevels", this.uncertaintyLevels); 
    };
    // called when a characrer is loaded 
    this.OnLoad = function () {
        if (this.communicator.canRead("uncertaintyLevels")){
            this.uncertaintyLevels = this.communicator.read("uncertaintyLevels");
        };
    };

    this.OnUpdate = function () {
    };

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
        // example of a populated list:
        // return ["colin-wielga-tools"]
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };
    // can your module be close?
    this.canClose = function () {
        return true;
    };
    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Cloud of Uncertainty";
    };

    this.OnNewCharacter();
   
};

g.services.componetService.registerCharacter(ScottLeviCloudOfUncertainty.component);

