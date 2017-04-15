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
        this.activeComponents = ["wanderer-core-modules", "wanderer-core-save"];
    }
    this.OnSave = function () {
        this.communicator.write("activeComponents", this.activeComponents);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("activeComponents")) {
            this.activeComponents = this.communicator.read("activeComponents");
        } else {
            this.activeComponents = [this.getId()];
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
            },
            //maybe this should be a dictonary
            getComponent: function (lookingFor) {
                for (var i = 0; i < that.components.length; i++) {
                    var inner = that.components[i];
                    if (lookingFor === inner.getId()) {
                        return inner.getPublic();
                    }
                }
                throw { message: "could not find id: " + lookingFor };
            },
            getActiveComponents:
                function () {
                    var res = [];
                    for (var i = 0; i < that.activeComponents.length; i++) {
                        var lookingFor = that.activeComponents[i];
                        for (var j = 0; j < that.components.length; j++) {
                            var inner = that.components[j];
                            if (lookingFor === inner.getId()) {
                                res.push(inner);
                            }
                        }
                    }

                    return res;
                },
            components: that.components,
            toggle: that.toggle
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "modules";
    }
    this.toggle = function (mod) {
        if (mod != that) {
            var i = that.activeComponents.indexOf(mod.getId());
            if (i == -1) {
                that.activeComponents.push(mod.getId());
            } else {
                that.activeComponents.splice(i, 1);
            }
        }
    }

    this.text = function (mod) {
        var i = this.activeComponents.indexOf(mod.getId());
        if (i == -1) {
            return "show";
        } else {
            return "hide";
        }
    }

    this.show = function (mod) {
        return this.activeComponents.indexOf(mod.getId()) == -1;
    }

    this.activeComponents = [this.getId()];
    this.components = [this];
}

g.ComponetRegistry.register(component);