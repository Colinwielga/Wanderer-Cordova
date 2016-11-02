g.Character = function ($timeout) {

    // ok so what we need to do is mint a bunch of modules
    // we can just mint a module manager
    // and it will mint the rest 
    var comps = {};
    var compsList = [];

    g.ComponetRegistry.componentFactories.forEach(function (item) {
        var tem = new item();
        comps[tem.getId()] = tem;
        compsList.push(tem);
    });

    var modulesPublic = comps["wanderer-core-modules"].getPublic();
    var managePublic = comps["wanderer-core-manage"].getPublic();
    //var logger = comps["wanderer-core-logger"].getPublic();
    var save = comps["colin-wielga-dynamo-save"].getPublic();

    this.displayName = function () {
        var name = save.getName();
        if (name === null || name === undefined || name === "") {
            return "untilted";
        } else {
            return name;
        }
    };

    modulesPublic.injectComponents(compsList);

    compsList.forEach(function (item) {
        var communicator = managePublic.comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                var dependencies = [];
                if (item.getRequires !== undefined) {
                    var lookingFors = item.getRequires();
                    for (var i = 0; i < lookingFors.length; i++) {
                        dependencies.push(modulesPublic.getComponent(lookingFors[i]));
                    }
                }
                // we inject some stuff
                item.injected = {};
                item.injected.timeout = $timeout;
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