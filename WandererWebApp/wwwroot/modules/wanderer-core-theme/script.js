let WandererCoreTheme = {};

WandererCoreTheme.component = function () {
    var that = this;

    this.getId = function () {
        return "wanderer-core-theme";
    };

    this.getSystem = function () {
        return "Core"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.logger = logger;
    };

    this.OnNewCharacter = function () {
        this.darkMode = false;
        this.myTheme = {};
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
        this.communicator.write("myTheme", this.myTheme);
    };

    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("myTheme")) {
                this.myTheme = this.communicator.read("myTheme");
                this.applyTheme();
            }
            // if (this.communicator.canRead("haveWarnings")) {
            //     this.haveWarnings = this.getWarnings(this.communicator.read("haveWarnings"));
            // }
        }
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
        return "Theme Editor";
    };

    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };


    this.getDarkMode = function () {
        return this.myTheme.darkMode
    }
    this.getDarkModeButtonText = function () {
        if (this.getDarkMode()) {
            return "Turn off dark mode"
        }
        else {
            return "Turn on dark mode"
        }
    }
    this.toggleDarkMode = function () {
        if (this.getDarkMode()) {
            this.myTheme.darkMode = false
        }
        else {
            this.myTheme.darkMode = true
        }
        this.applyTheme()
    }

    this.applyTheme = function () {
        var e = document.getElementById("all");
        if (this.getDarkMode()) {
            e.style.backgroundColor = "black";
        }
        else {
            e.style.backgroundColor = "white";
        }
    }

}

g.services.componetService.registerCharacter(WandererCoreTheme.component);