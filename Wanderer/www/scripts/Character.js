g.Character = function ($timeout) {

    // ok so what we need to do is mint a bunch of modules
    // we can just mint a module manager
    // and it will mint the rest 
    var comps = {};
    var charactor = {};
    var compsList = [];

    var VERSION = "VERSION"
    var META = "META"

    var load = function (json) {
        charactor = json;
        compsList.forEach(function (item) {
            if (item.OnLoad !== undefined) {
                try {
                    item.OnLoad();
                } catch (e) {
                    if (logger != undefined && logger.writeToLog != undefined) {
                        logger.writeToLog(e);
                    }
                }
            }
        });
    }

    var getJSON = function () {
        compsList.forEach(function (item) {
            if (item.OnSave !== undefined) {
                try {
                    item.OnSave();
                    if (charactor[item.getId()] == undefined) {
                        charactor[item.getId()] = {};
                    }
                    if (charactor[item.getId()][META] == undefined) {
                        charactor[item.getId()][META] = {};
                    }
                    charactor[item.getId()][META][VERSION] = item.getPublic().getVersion();
                } catch (e) {
                    if (logger != undefined && logger.writeToLog != undefined) {
                        logger.writeToLog(e);
                    }
                }
            }
        });
        return charactor;
    }

    var comboKey = function (item, key) {
        return item.getId() + "_" + key;
    };
    var versionComboKey = function (item, key) {
        return "Version_" + item.getId() + "_" + key;
    }

    var comFactory = function (item) {
        return {
            read: function (key) {
                return charactor[item.getId()][key];
            },
            canRead: function (key) {
                return charactor[item.getId()] !== undefined && charactor[item.getId()][key] !== undefined;
            },
            write: function (key, value) {
                if (charactor[item.getId()] === undefined) {
                    charactor[item.getId()] = {};
                }
                charactor[item.getId()][key] = value;
            },
            lastVersion: function () {
                if (charactor[item.getId()] === undefined) {
                    return -1;
                }
                if (charactor[item.getId()][META] === undefined) {
                    return -1;
                }
                if (charactor[item.getId()][META][VERSION] === undefined) {
                    return -1;
                }
                return charactor[item.getId()][META][VERSION];
            },
            readNotCharacter: function (key) {
                return window.localStorage.getItem(comboKey(item,key));
            },
            readNotCharacterVersion: function (key) {
                return window.localStorage.getItem(versionComboKey(item, key));
            },
            canReadNotCharacter: function (key) {
                return window.localStorage.getItem(comboKey(item, key)) !== undefined;
            }, writeNotCharacter: function (key, value) {
                window.localStorage.setItem(comboKey(item, key), value);
                window.localStorage.setItem(versionComboKey(item, key), item.getPublic().getVersion());
            }
        };
    }

    g.ComponetRegistry.componentFactories.forEach(function (item) {
        var tem = new item();
        comps[tem.getId()] = tem;
        compsList.push(tem);
    });

    var modulesPublic = comps["wanderer-core-modules"].getPublic();
    var logger = comps["wanderer-core-logger"].getPublic();
    var save = comps["colin-wielga-dynamo-save"].getPublic();

    this.displayName = function () {
        var name = save.getName();
        if (name === null || name === undefined || name === "") {
            return "untilted";
        } else {
            return name;
        }
    };

    this.getBonus = function () {
        var res = 0;
        compsList.forEach(function (comp) {
            var pub = comp.getPublic();
            if (pub.bonusProvided != undefined) {
                res += pub.bonusProvided();
            }
        })
        return res;
    }

    modulesPublic.injectComponents(compsList);

    var that = this;

    compsList.forEach(function (item) {
        var communicator = comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                item.injected = {};
                item.injected.timeout = $timeout;
                item.injected.load = load;
                item.injected.getJSON = getJSON;
                item.injected.getBonus = that.getBonus;

                var dependencies = [];
                if (item.getRequires !== undefined) {
                    var lookingFors = item.getRequires();
                    for (var i = 0; i < lookingFors.length; i++) {
                        dependencies.push(modulesPublic.getComponent(lookingFors[i]));
                    }
                }
                // we inject some stuff

                // we start.
                item.OnStart(communicator, dependencies);
            } catch (e) {
                if (logger != undefined && logger.writeToLog != undefined) {
                    logger.writeToLog(e);
                }
            }
        }
    });

    this.modules = modulesPublic.getActiveComponents;

    this.Remove = function (module) {
        modulesPublic.toggle(module);
    }
}