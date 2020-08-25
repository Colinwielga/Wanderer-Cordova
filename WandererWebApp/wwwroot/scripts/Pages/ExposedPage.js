g.ExposedPage = function (components, startingActiveComponentsIds, name, accessKey) {
    this.components = components;
    this.activeComponentsIds = startingActiveComponentsIds;
    this.name = name;
    this.accessKey = accessKey;
    var that = this;


    this.getComponent = function (compId) {
        for (var i = 0; i < that.components.length; i++) {
            var inner = that.components[i];
            if (compId === inner.getId()) {
                return inner.getPublic();
            }
        }
        throw { message: "could not find id: " + compId };
    };
    this.clear = function () {
        this.activeComponentsIds = [];
    };

    this.getActiveComponents = function () {
        var res = [];
        for (var i = 0; i < that.activeComponentsIds.length; i++) {
            var lookingFor = that.activeComponentsIds[i];
            var comp = that.getComponentById(lookingFor);
            if (comp !== null) {
                res.push(comp);
            }
        }
        return res;
    };
    this.getComponents = function () {
        return that.components;
    };
    this.getActiveComponentsIds = function () {
        return that.activeComponentsIds;
    };
    this.toggle = function (module) {
        var i = that.activeComponentsIds.indexOf(module.getId());
        if (i === -1) {
            that.activeComponentsIds.push(module.getId());
        } else {
            that.activeComponentsIds.splice(i, 1);
        }
    };
    this.activate = function (moduleId) {
        var i = that.activeComponentsIds.indexOf(moduleId);
        if (i === -1) {
            that.activeComponentsIds.push(moduleId);
        }
    };

    this.updateLastLoaded = function (json) {
        that.lastLoaded = angular.fromJson(angular.toJson(json));
    };

    this.getComponentById = function (lookingFor) {
        for (var j = 0; j < that.components.length; j++) {
            var inner = that.components[j];
            if (lookingFor === inner.getId()) {
                return inner;
            }
        }
        console.log("could not find comp: " + lookingFor);
        return null;
    };

    this.getToLoad = function (json){
        var toLoad = [];
        if (that.lastLoaded !== null && that.lastLoaded !== undefined) {
            for (var property in json) {
                if (json.hasOwnProperty(property)) {
                    if (angular.toJson(json[property]) !== angular.toJson(that.lastLoaded[property])) {
                        toLoad.push(property);
                    }
                }
            }
        }
        return toLoad; 
    }

    // returns true if they are the same
    this.compareWithLastLoaded = function (json){
        return this.getToLoad(json).length === 0;
    }

    this.compareWithLastLoadedAndUpdate = function (json) {

        that.components.forEach(function (component) {
            component.injected.dataManager.useLocal = true;
            component.injected.dataManager.remote = null;
        });

        var toLoad = this.getToLoad(json);

        that.updateLastLoaded(json);

        // we load after we finish the check incase 
        toLoad.forEach(function (property) {
            var component = that.getComponentById(property);
            if (component !== null) {
                component.injected.dataManager.useLocal = false;
                component.injected.dataManager.remote = json[property];
                component.OnLoad();
            } else {
                console.log(property + " not found, is this a problem?");
            }
        });

        return toLoad.length === 0;
    };
    this.getBonus = function () {
        var res = 0;
        that.components.forEach(function (component) {
            var pub = component.getPublic();
            if (pub.bonusProvided !== undefined) {
                res += pub.bonusProvided();
            }
        });
        return res;
    };
    this.getJSON = function () {
        var res = {};
        that.components.forEach(function (component) {
            if (component.OnSave !== undefined) {
                try {
                    component.OnSave();
                    var map = component.injected.dataManager.current();
                    if (map === undefined) {
                        map = {};
                    }
                    if (map[g.constants.META] === undefined) {
                        map[g.constants.META] = {};
                    }
                    map[g.constants.META][g.constants.VERSION] = component.getPublic().getVersion();
                    res[component.getId()] = map;
                } catch (e) {
                    // this should wrap all module interactions
                    console.log(e);
                }
            }
        });
        return res;
    };
};