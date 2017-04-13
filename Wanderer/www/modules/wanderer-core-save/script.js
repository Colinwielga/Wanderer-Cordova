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
        that.injected.name = "untitled";
    }
    this.OnSave = function () {
        this.communicator.write("name", that.injected.name);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("name")) {
            that.injected.name = this.communicator.read("name");
        } else {
            that.injected.name = "untitled";
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
            g.services.characterService.SaveCharacter(that.injected.accessKey, that.injected.name, angular.toJson(that.injected.getJSON()),
                function (data) {
                    that.injected.timeout(function () {
                        that.injected.logger.info("save successful!");
                    })
                },
                function (error) {
                    that.injected.timeout(function () {
                        that.injected.logger.error("save failed " + error);
                    });
                });
        };
        g.services.characterService.GetCharacter( this.accessKey, function (json) {
            var ok = that.injected.compareWithLastLoaded(json);
            if (ok) {
                reallySave();
                var ok = that.injected.updateLastLoaded(json);
            } else {
                that.injected.timeout(function () {
                    that.injected.logger.warn("save failed, merge conflicts!");
                });
            }
        },
        function (error) {
            that.injected.timeout(function () {
                that.injected.logger.error("character could not be found: "+ error);
            });
        },
        function (error) {
            that.injected.timeout(function () {
                that.injected.logger.error("error: " + error);
            });
        })
    }
}

g.ComponetRegistry.register(component);