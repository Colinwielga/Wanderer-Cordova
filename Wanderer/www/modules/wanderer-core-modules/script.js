var component = function () {
    var that = this;
    this.getId = function () {
        return "wanderer-core-modules"
    }

    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.OnNewCharacter()
    }
    this.OnNewCharacter = function () {
    }
    this.OnSave = function () {
        this.communicator.write("activeComponents",
            g.services.moduleService.getActiveComponentsIds(that.injected.pageId));
    }
    this.OnLoad = function () {
        var toActivate = [];
        g.services.moduleService.clear(that.injected.pageId);
        if (this.communicator.canRead("activeComponents")) {
            this.communicator.read("activeComponents").forEach(function(item){
                toActivate.push(item);
            })
        } 

        for (var i = 0, len = toActivate.length; i < len; i++) {
            g.services.moduleService.activate(that.injected.pageId, toActivate[i]);
        }
    }
    this.getRequires = function () {
        return [];
    }
    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            },
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Modules";
    }
    this.canClose = function () {
        return false;
    }
    this.toggle = function (mod) {
        g.services.moduleService.toggle(that.injected.pageId, mod);
    }

    this.text = function (mod) {
        var i = g.services.moduleService.getActiveComponents(that.injected.pageId).indexOf(mod.getId());
        if (i == -1) {
            return "show";
        } else {
            return "hide";
        }
    }

    this.components = function () {
        return g.services.moduleService.getComponents(that.injected.pageId);
    }

    this.show = function (mod) {
        return g.services.moduleService.getActiveComponentsIds(that.injected.pageId).indexOf(mod.getId()) == -1;
    }
}

g.services.componetService.registerCharacter(component);