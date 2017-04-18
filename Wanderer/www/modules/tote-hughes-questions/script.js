var component = function () {
    this.getId = function () {
        return "tote-hughes-questions"
    }
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.questions = [];
    }
    this.OnSave = function () {
        this.communicator.write("questions", this.questions);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("questions")) {
            this.questions = this.communicator.read("questions");
        } else {
            this.questions = [];
        }
        this.orderQuestions();
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Questions";
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            }
        }
    }
    
    this.getNewQuestion = function() {
        var alreadyAskedIDs = [];
        for (var i = 0; i < this.questions.length; i++) {
            alreadyAskedIDs.push(this.questions[i]["id"]);
        }
        var newDict = Questions.getNewQuestion(alreadyAskedIDs); //{"id": 2, "ask": "What's going on?", "answer": "I have no idea."};
        this.questions.push(newDict);
//        this.questions.push(Questions.Questioned(1, "What makes me content?", ""));
//        this.questions.push(Questions.getNewQuestion());
//        return this.questions[this.questions.length - 1];
    }
    
    this.getQuestionIndex = function(questionID) {
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i]["id"] == questionID) {
                return i;
            }
        }
    }
    
    this.editQuestion = function(questionID) {
        var qi = this.getQuestionIndex(questionID);
        this.questions[qi]["answer"] = "";
    }
    
    this.saveQuestion = function(questionID) {
        var qi = this.getQuestionIndex(questionID);
        this.questions[qi]["answer"] = this.questions[qi]["suggestion"];
//        this.orderQuestions();
    }
    
    this.orderQuestions = function() {
        var answered = [];
        var unanswered = [];
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i]["answer"]) {
                answered.push(this.questions[i]);
            }
            else {
                unanswered.push(this.questions[i]);
            }
        }
        this.questions = unanswered.concat(answered);
    }
    
    this.OnNewCharacter();
}
g.services.componetService.registerCharacter(component);
