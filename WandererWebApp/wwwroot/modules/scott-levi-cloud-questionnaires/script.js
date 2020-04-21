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
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () { 
        this.cloudImmigrationQuestion1 = "";
        this.cloudImmigrationQuestion2 = "";
        this.cloudImmigrationQuestion3 = "";
        this.cloudPrisonQuestion1 = "";
        this.cloudPrisonQuestion2 = "";
        this.cloudPrisonQuestion3 = "";
        this.cloudTaskForceQuestion1 = "";
        this.cloudTaskForceQuestion2 = "";
        this.cloudTaskForceQuestion3 = "";
        
    };

    this.OnSave = function () { 
        this.communicator.write("cloud immigration question1", this.cloudImmigrationQuestion1);
        this.communicator.write("cloud immigration question2", this.cloudImmigrationQuestion2);
        this.communicator.write("cloud immigration question3", this.cloudImmigrationQuestion3);
        this.communicator.write("cloud prison question1", this.cloudPrisonQuestion1);
        this.communicator.write("cloud prison question2", this.cloudPrisonQuestion2);
        this.communicator.write("cloud prison question3", this.cloudPrisonQuestion3);
        this.communicator.write("cloud task force question1", this.cloudTaskForceQuestion1);
        this.communicator.write("cloud task force question2", this.cloudTaskForceQuestion2);
        this.communicator.write("cloud task force question3", this.cloudTaskForceQuestion3);
    };

    this.OnLoad = function () { 
        if (this.communicator.canRead("cloud immigration question1")) {
            this.cloudImmigrationQuestion1 = this.communicator.read("cloud immigration question1");
        } else {
            this.cloudImmigrationQuestion1 = "";
        }
        if (this.communicator.canRead("cloud immigration question2")) {
            this.cloudImmigrationQuestion2 = this.communicator.read("cloud immigration question2");
        } else {
            this.cloudImmigrationQuestion2 = "";
        }
        if (this.communicator.canRead("cloud immigration question3")) {
            this.cloudImmigrationQuestion3 = this.communicator.read("cloud immigration question3");
        } else {
            this.cloudImmigrationQuestion3 = "";
        }
        if (this.communicator.canRead("cloud prison question1")) {
            this.cloudPrisonQuestion1 = this.communicator.read("cloud prison question1");
        } else {
            this.cloudPrisonQuestion1 = "";
        }
        if (this.communicator.canRead("cloud prison question2")) {
            this.cloudPrisonQuestion2 = this.communicator.read("cloud prison question2");
        } else {
            this.cloudPrisonQuestion2 = "";
        }
        if (this.communicator.canRead("cloud prison question3")) {
            this.cloudPrisonQuestion3 = this.communicator.read("cloud prison question3");
        } else {
            this.cloudPrisonQuestion3 = "";
        }
        if (this.communicator.canRead("cloud task force question1")) {
            this.cloudTaskForceQuestion1 = this.communicator.read("cloud task force question1");
        } else {
            this.cloudTaskForceQuestion1 = "";
        }
        if (this.communicator.canRead("cloud task force question2")) {
            this.cloudTaskForceQuestion2 = this.communicator.read("cloud task force question2");
        } else {
            this.cloudTaskForceQuestion2 = "";
        }
        if (this.communicator.canRead("cloud task force question3")) {
            this.cloudTaskForceQuestion3 = this.communicator.read("cloud task force question3");
        } else {
            this.cloudTaskForceQuestion3 = "";
        }
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

    this.getTitle = function () {
        return "Cloud Questionnares";
    };

};

g.services.componetService.registerCharacter(ScottLeviCloudQuestionnaires.component);