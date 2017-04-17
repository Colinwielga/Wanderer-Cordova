var CoreStartSwitchAccount = {};

CoreStartSwitchAccount.component = function () {
    this.getId = function () {
        return "core-start-switch-account"
    }

    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
    }
    this.OnNewCharacter = function () {
    }
    this.OnSave = function () {
    }
    this.OnLoad = function () {
    }
    this.OnUpdate = function () {
    }
    this.getRequires = function () {
        return [];
    }
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Switch Account";
    }
    this.getId = function () {
        return g.services.accountService.currentAccount.id;
    }
    this.OpenAccount = function(){
        g.services.pageService.OpenAccount(this.AccountToOpen);
    }
    this.OnNewCharacter();
}

g.ComponetRegistry.registerStart(CoreStartSwitchAccount.component);