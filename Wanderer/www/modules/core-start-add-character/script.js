var CoreStartAddCharacters = {};

CoreStartAddCharacters.component = function () {
    var that = this;
    this.getId = function () {
        return "core-start-add-character"
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
        return "title";
    }
    this.OnNewCharacter();
    this.OpenCharacter = function () {
        g.services.pageService.OpenCharacterById(that.toOpen);
    }
}

g.services.componetService.registerStart(CoreStartAddCharacters.component);