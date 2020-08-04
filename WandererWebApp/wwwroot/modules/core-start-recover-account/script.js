var ColinWielgaTemplate = {};

ColinWielgaTemplate.component = function () {
    var that = this;
    that.email = "";
    this.getId = function () {
        return "core-start-recover-account";
    };
    this.getSystem = function () {
        return "Core"
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.logger = logger;
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    this.OnNewCharacter = function () {
    };
    this.OnSave = function () {
    };
    this.OnLoad = function () {
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
        return "modules/" + this.getId() + "/page.html"
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    };

    this.getTitle = function () {
        return "Recover Account";
    };
    this.recover = function () {
        return g.services.accountService.RecoverAccount(that.email,
            function () {
                g.services.timeoutService.$timeout(function () {
                    that.logger.warn("account recovered");
                });
            },
            function () {
                g.services.timeoutService.$timeout(function () {
                    that.logger.warn("could not find email address.");
                });
            },
            function (err) {
                g.services.timeoutService.$timeout(function () {
                    that.logger.warn("failed to recover account:" + err);
                });
            }
        );
    };
};

g.services.componetService.registerStart(ColinWielgaTemplate.component);