var DCKingdomBonds = {};

DCKingdomBonds.component = function () {

    /* LOCAL FUNCTIONS AND DEFINITIONS */

    /////////////////////////////////////

    // all component need a unique ID
    this.getId = function () {
        return "dc-kingdom-bonds";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    this.OnNewCharacter = function () {
        this.left_name = "";
        this.left_description = "";
        this.right_name = "";
        this.right_description = "";
    };
    this.OnSave = function () {
        this.communicator.write("left_name",this.left_name);
        this.communicator.write("left_description",this.left_description);
        this.communicator.write("right_name",this.right_name);
        this.communicator.write("right_description",this.right_description);
    };
    this.OnLoad = function () {
        this.left_name = this.communicator.canRead("left_name") ? this.communicator.read("left_name") : ""
        this.left_description = this.communicator.canRead("left_description") ? this.communicator.read("left_description") : ""
        this.right_name = this.communicator.canRead("right_name") ? this.communicator.read("right_name") : ""
        this.right_description = this.communicator.canRead("right_description") ? this.communicator.read("right_description") : ""
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
        return "Kingdom Bonds";
    };

    this.getSystem = function () {
        return "Kingdom";
    };
    
    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(DCKingdomBonds.component);
