var component = function () {
    var that = this;
    this.groupName = "";
    this.OnJoindCallbacks = [];

    this.getId = function () {
        return "wanderer-core-save";
    };

    this.getSystem = function () {
        return "Core";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.logger = logger;
        this.page = page;
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.OnNewCharacter();

    };
    this.OnNewCharacter = function () {
        that.page.name = "untitled";
    };
    this.OnSave = function () {
        this.communicator.write("name", that.page.name);
        this.communicator.write("group-name", that.groupName);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("name")) {
            that.page.name = this.communicator.read("name");
        } else {
            that.page.name = "untitled";
        }
        if (this.communicator.canRead("group-name")) {
            that.groupName = this.communicator.read("group-name");
        }
        if (this.groupName !== undefined && this.groupName !== null && this.groupName !== "") {
            this.Join();
        }
    };
    this.getRequires = function () {
        return [];
    };
    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            },
            injectComponents: function (comps) {
                that.components = comps;
            },
            onJoin: function (callback) {
                that.OnJoindCallbacks.push(callback);
            }
        };
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getTitle = function () {
        return "Save";
    };

    this.Join = function () {
        g.services.SignalRService.Join(that.groupName, that.key);
        for (var callback of that.OnJoindCallbacks) {
            callback(that.groupName);
        }
        that.logger.info("Join Successful!");
        that.lastJoined = that.groupName;
    };

    this.joinedButtonText = function () {
        if (that.lastJoined === that.groupName) { 
            return "Joined"; 
        } else { 
            return "Join";
        } 
    };
    
    
    this.copyId = async function () {
        var ID = this.page.accessKey;
        await navigator.clipboard.writeText(ID);
        g.services.timeoutService.$timeout(function () {
            that.logger.info("Copy Successful!");
        });
    };
};

g.services.componetService.registerCharacter(component);