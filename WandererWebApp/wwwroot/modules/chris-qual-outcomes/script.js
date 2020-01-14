var ChrisQualOutcomes = {};

ChrisQualOutcomes.component = function () {


    this.getSuccess = function () {
        return Math.round(((100.0 - this.uncertain)/100.0) * ((this.success)/100.0) * 100.0);
    };
    this.getFailure = function () {
        return Math.round(((100.0 - this.uncertain)/100.0) * ((100.0 - this.success)/100.0) * 100.0);
    };
    this.getUncertain = function () {
        return Math.round(this.uncertain);
    };

    this.getSystem = function () {
        return "Qualitative Outcomes"
    };
 
 
    this.prob = function (outcome) {
        var proboutcome = 0;
        if (outcome.cat === "Positive") { proboutcome = outcome.weight * this.getSuccess(); }
        else if (outcome.cat === "Negative") { proboutcome = outcome.weight * this.getFailure(); }
        else if (outcome.cat === "Other") { proboutcome = outcome.weight * this.getUncertain(); }
        return proboutcome;
    };

    this.roll = function () {

        var mass = 0;

        for (i = 0; i < this.OutcomeList.length; i++) {
            mass += this.prob(this.OutcomeList[i]);
        }

        var r = mass * Math.random();

        var at = 0;

        for (i = 0; i < this.OutcomeList.length; i++) {
            at += this.prob(this.OutcomeList[i]);
            if (r < at) {
                this.output = this.OutcomeList[i];
                break;
            }
        }

    };
    
    this.getId = function () {
        return "chris-qual-outcomes";
    };

    this.OutcomeList = [
        { name: "Success", cat: "Positive", resolved: true, weight: 50 },
        { name: "Brilliant Success", cat: "Positive", resolved: true, weight: 15 },
        { name: "An Easy Choice", cat: "Positive", resolved: true, weight: 10 },
        { name: "Divine Intervention", cat: "Positive", resolved: true, weight: 5 },
        { name: "A costly success", cat: "Positive", resolved: true, weight: 5 },
        { name: "An Unexpected Bonus", cat: "Positive", resolved: true, weight: 5 },
        { name: "An Opportunity with a cost", cat: "Positive", resolved: true, weight: 5 },
        { name: "A New Friend", cat: "Positive", resolved: false, weight: 5 },

        { name: "Failure", cat: "Negative", resolved: true, weight: 60 },
        { name: "Simple Bad Luck", cat: "Negative", resolved: true, weight: 10 },
        { name: "Catastrophe", cat: "Negative", resolved: true, weight: 10 },
        { name: "A New Enemy", cat: "Negative", resolved: false, weight: 10 },
        { name: "Failure, But With A Consolation Prize", cat: "Negative", resolved: true, weight: 10 },

        { name: "A Difficult Choice", cat: "Other", resolved: true, weight: 30 },
        { name: "A Perplexing Situation", cat: "Other", resolved: false, weight: 10 },
        { name: "Something New Gets In The Way", cat: "Other", resolved: false, weight: 10 },
        { name: "A Change of Direction", cat: "Other", resolved: false, weight: 10 },
        { name: "The Situation Escalates", cat: "Other", resolved: false, weight: 20 },
        { name: "Things Get Worse", cat: "Other", resolved: false, weight: 10 },
        { name: "GHOSTS", cat: "Other", resolved: false, weight: 10 }];
    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) { };
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.success = 50;
        this.uncertain = 20;
    };
    // called when a character is saved
    this.OnSave = function () { };
    // called when a characrer is loaded 
    this.OnLoad = function () { };
    this.OnUpdate = function () { };

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
        return "Qualitative Outcome Generator";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ChrisQualOutcomes.component);