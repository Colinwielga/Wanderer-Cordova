g.Character = function ($timeout) {
    var that = this;

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
        that.lastLoaded = json;
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

    var logFactory = function () {
        // why are these flags?
        var TypeEnum = {
            VERBOSE:1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5,
            WTF: 6,
        }
        // logging constants

        var logTimeout = 1000 * 60;
        var logLevel = TypeEnum.VERBOSE;

        return {
            logs: [],
            displayLogs: function () {
                var now = new Date().getTime();
                var res = [];
                this.logs.forEach(function (log) {
                    if (log.type > logLevel && now - logTimeout < log.timeStamp && !log.closed) {
                        res.push(log);
                    }
                });
                return res;
            },
            log: function (message, type) {
                this.logs.push({
                    message: message,
                    type: type,
                    closed: false,
                    timeStamp: new Date().getTime()
                });
            },
            debug: function (message) {
                this.log(message, TypeEnum.DEBUG);
            },
            info: function (messagae) {
                this.log(message, TypeEnum.INFO);
            },
            warn: function (message) {
                this.log(message, TypeEnum.WARN);
            },
            error: function (message) {
                this.log(message, TypeEnum.ERROR);
            },
            wtf: function (message) {
                this.log(message, TypeEnum.WTF);
            }
        }
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

    this.mergeConflicts = function (mod) {

        throw { message: "I need more code!" }

        // TODO if the module has merge conflicts handle it
        return null;
    }

    this.compareWithLastLoaded = function (json) {
        //TODO!

        throw {message:"I need more code!"}

        that.lastLoaded = json;
        return false;
    }

    this.getModSet = function (mod) {
        var res = [mod];
        var conflicts = this.mergeConflicts(mod);
        if (conflicts != null) {
            res.push(conflicts);
        }
        return res;
    }

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

    compsList.forEach(function (item) {
        var communicator = comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                item.injected = {};
                item.injected.timeout = $timeout;
                item.injected.load = load;
                item.injected.logger = logFactory();
                item.injected.getJSON = getJSON;
                item.injected.getBonus = that.getBonus;
                item.injected.isMerge = function () { return true; };
                item.injected.compareWithLastLoaded = that.compareWithLastLoaded;

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