App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {
    var managePublic = g.ComponentManager.getComponent("wanderer-core-manage")
    var manageModules = g.ComponentManager.getComponent("wanderer-core-modules")
    var awsPublic = g.ComponentManager.getComponent("colin-wielga-dynamo-save")
    var logger = g.ComponentManager.getComponent("wanderer-core-logger")

    $scope.onUpdate = function () {
        manageModules.components.forEach(function (item) {
            if (item.OnUpdate !== undefined) {
                try {
                    item.OnUpdate();
                } catch (e) {
                    if (logger != undefined && logger.writeToLog != undefined) {
                        logger.writeToLog(e);
                    }
                }
            }
        });
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = (25 + target.scrollHeight) + "px";
        }
        return "on update";
    }

    manageModules.components.forEach(function (item) {
        var communicator = managePublic.comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                var dependencies = [];
                if (item.getRequires !== undefined) {
                    var lookingFors = item.getRequires();
                    for (var i = 0; i < lookingFors.length; i++) {
                        dependencies.push(manageModules.getComponent(lookingFors[i]));
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
    awsPublic.loadLastCharacter();

    $scope.modules = manageModules.getActiveComponents;

    $scope.Remove = function (module) {
        manageModules.toggle(module);
    }

}]);

