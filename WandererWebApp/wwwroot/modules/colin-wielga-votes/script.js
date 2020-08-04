var ColinWielgaVotes = {};

ColinWielgaVotes.component = function () {
    // which system the module belongs to
    this.getSystem = function () {
        return "Kingdom"
    };
    // all component need a unique ID
    this.getId = function () {
        return "colin-wielga-votes";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () {
        this.entityId = g.makeid();
    };
    this.OnSave = function () {
        this.communicator.write("entityId", that.entityId);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("entityId")) {
            that.page.name = this.communicator.read("entityId");
        } else {
            this.entityId = g.makeid();
        }
    };
    this.OnUpdate = function () {};

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
        return "Voting";
    };

    this.copyId = async function () {
        var ID = this.entityId;
        await navigator.clipboard.writeText(ID);
        g.services.timeoutService.$timeout(function () {
            that.logger.info("Copy Successful!");
        });
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinWielgaVotes.component);