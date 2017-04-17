var CoreStartRecentCharacters = {};

CoreStartRecentCharacters.component = function () {
    this.getId = function () {
        return "core-start-recent-characters"
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
        return ["colin-wielga-tools"];
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
        return "title";
    }
    this.getCharacterAccessers = function () {
        return g.services.accountService.currentAccount.characterAccessers;
    }
    this.OpenCharacter = function (accesser) {
        return g.services.pageService.OpenCharacter(accesser);
    }
    this.Add = function () {
        return g.services.pageService.Add();
    }
    this.OnNewCharacter();
}

g.ComponetRegistry.registerStart(CoreStartRecentCharacters.component);