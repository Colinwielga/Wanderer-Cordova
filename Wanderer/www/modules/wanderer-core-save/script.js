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
        this.name = "untitled";
    }
    this.OnSave = function () {
        this.communicator.write("name", this.name);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("name")) {
            this.name = this.communicator.read("name");
        } else {
            this.name = "untitled";
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
            injectComponents: function (comps) {
                that.components = comps;
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
        return "Save";
    }
    this.save = function () {
        var reallySave = function () {
            that.provider.SaveCharacter(that.name, that.gameName, that.gamePassword, angular.toJson(that.injected.getJSON()),
                function (data) {
                    that.injected.timeout(function () {
                        that.state = ColinWielgaDyanmo.States.NEW;
                    })
                },
                that.CouldNotFindGame,
                that.Error)
        };


        // TODO you are here
        // 1 - this.accessKey does not exist
        // 2 - that.CouldNotFindCharacter  does not exist
        // 3 - that.Error does not exist

        // todo bring this to other ways of saving
        g.services.characterService.GetCharacter(this.name, this.accessKey, function (json) {
            var ok = that.injected.compareWithLastLoaded(json);
            if (ok) {
                reallySave();
                var ok = that.injected.updateLastLoaded(json);
            } else {
                // we have merge conflicts tell the use
                that.injected.logger.warn("merge conflicts!");
                that.injected.timeout(function () {
                    that.state = ColinWielgaDyanmo.States.NEW;
                });
            }
        },
        that.CouldNotFindCharacter,
        that.Error)
    }
}

g.ComponetRegistry.register(component);