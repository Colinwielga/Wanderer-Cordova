var DCHumoursPlayerQuestions = {};

DCHumoursPlayerQuestions.component = function () {

    //Returns the list of questions for tab at index tab_idx, defaulting to 
    //the currently selected tab.
    this.getQuestionlistForTab = function(tab_idx){
        tab_idx = tab_idx || this.current_tab;
        return this.questionlist[tab_idx].questions;
    }
    this.getNonQuestionlistForTab = function(tab_idx){
        tab_idx = tab_idx || this.current_tab;
        return this.questionlist[tab_idx].non_questions;
    }

    //Changes the currently selected question section.
    this.changeTab = function(section){
        this.current_tab = this.questionlist.indexOf(section);
    }

    //Changes the currently selected question choice.
    this.selectChoice = function(question, choice){
        question.choices.forEach(function(q_choice){
            q_choice.chosen = (q_choice === choices);
        });
    }

    this.questionlist = []; 

    // all component need a unique ID
    this.getId = function () {
        return "dc-humours-player-questions"
    }

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
    }
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.current_tab = 0;
    }
    // called when a character is saved
    this.OnSave = function () {
        this.communicator.write("questionlist", this.questionlist);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        this.questionlist = this.communicator.read("questionlist"); 
    }
    this.OnUpdate = function () {
    }

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
        return ["colin-wielga-tools"];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "Player Questions";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(DCHumoursPlayerQuestions.component);
