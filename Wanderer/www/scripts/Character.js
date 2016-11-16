g.Character = function ($timeout) {
    var that = this;

    var charactorJson = {};

    var VERSION = "VERSION"
    var META = "META"

    var comboKey = function (item, key) {
        return item.getId() + "_" + key;
    };
    var versionComboKey = function (item, key) {
        return "Version_" + item.getId() + "_" + key;
    }
    var comFactory = function (source) {
        return {
            read: function (key) {
                return source[key];
            },
            canRead: function (key) {
                return source !== undefined && source[key] !== undefined;
            },
            write: function (key, value) {
                if (source === undefined) {
                    source = {};
                }
                source[key] = value;
            },
            lastVersion: function () {
                if (source === undefined) {
                    return -1;
                }
                if (source[META] === undefined) {
                    return -1;
                }
                if (source[META][VERSION] === undefined) {
                    return -1;
                }
                return source[META][VERSION];
            },
            readNotCharacter: function (key) {
                return window.localStorage.getItem(comboKey(item, key));
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
            VERBOSE: 1,
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
    this.displayName = function () {
        var name = save.getName();
        if (name === null || name === undefined || name === "") {
            return "untilted";
        } else {
            return name;
        }
    };
    this.mergeConflicts = function (mod) {
        return that.moduleMap[mod.getId()];
    }
    this.compareWithLastLoaded = function (json) {
        that.moduleMap = {};
        var sourceMap = {};
        var genList = [];
        for (var property in json) {
            if (json.hasOwnProperty(property)) {
                if (JSON.stringify(json[property]) == JSON.stringify(that.lastLoaded[property])) {
                } else {
                    sourceMap[property] = json[property];
                    genList.push(that.comps[property].injected.multiply);

                }
            }
        }

        var res = that.mintModules(
            genList,
            function (key) {
                return sourceMap[key];
            },
            that.getModulPublic);

        res.modules().forEach(function (mod) {
            that.moduleMap[mod.getId()] = mod;
        })

        that.lastLoaded = json;
        return res.modules().length ==0 ;
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

    this.mintModules = function (componentFactoriesList,sourceGen,getDependencyBackUp) {
        var comps = {};
        var compsList = [];

        componentFactoriesList.forEach(function (item) {
            var tem = new item();
            tem.injected = {};
            tem.injected.multiply = item;
            comps[tem.getId()] = tem;
            compsList.push(tem);
        });

        var modulesPublic = comps["wanderer-core-modules"].getPublic();
        var logger = comps["wanderer-core-logger"].getPublic();
        var save = comps["colin-wielga-dynamo-save"].getPublic();

        modulesPublic.injectComponents(compsList);

        compsList.forEach(function (item) {
            var communicator = comFactory(sourceGen(item.getId()));
            if (item.OnStart !== undefined) {
                try {
                    item.injected.timeout = $timeout;
                    item.injected.load = function (json) {
                        charactorJson = json;
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
                    };
                    item.injected.logger = logFactory();
                    item.injected.getJSON = function () {
                        compsList.forEach(function (item) {
                            if (item.OnSave !== undefined) {
                                try {
                                    item.OnSave();
                                    if (source == undefined) {
                                        source = {};
                                    }
                                    if (source[META] == undefined) {
                                        source[META] = {};
                                    }
                                    source[META][VERSION] = item.getPublic().getVersion();
                                } catch (e) {
                                    if (logger != undefined && logger.writeToLog != undefined) {
                                        logger.writeToLog(e);
                                    }
                                }
                            }
                        });
                        return charactorJson;
                    }
                    item.injected.getBonus = that.getBonus;
                    item.injected.isMerge = function () { return true; };
                    item.injected.compareWithLastLoaded = that.compareWithLastLoaded;

                    var dependencies = [];
                    if (item.getRequires !== undefined) {
                        var lookingFors = item.getRequires();
                        for (var i = 0; i < lookingFors.length; i++) {
                            var pimary = modulesPublic.getComponent(lookingFors[i])
                            if (pimary != null) {
                                dependencies.push(pimary);
                            }else{
                                var backup = getDependencyBackUp(lookingFors[i]);
                                if (backup != null) {
                                    dependencies.push(backup);
                                }
                            }
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

        return {
            modules: modulesPublic.getActiveComponents,
            remove: function (module) {
                modulesPublic.toggle(module);
            },
            getModulPublic: modulesPublic.getComponent
        };
    }

    var mods = this.mintModuleManagement(g.ComponetRegistry.componentFactories, function (key) {
        return charactorJson[key];
    }, function (key) {
        return null;
    });

    this.modules = mods.moules;
    this.Remove = mods.remove;
    this.getModulPublic = mods.getModulPublic;
}