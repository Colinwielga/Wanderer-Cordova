App.controller('wandererController', ['$scope', function ($scope) {
    var managePublic = g.ComponentManager.getComponent("wanderer-core-manage")
    var manageModules = g.ComponentManager.getComponent("wanderer-core-modules")

    $scope.onUpdate = function () {
        manageModules.components.forEach(function (item) {
            if (item.OnUpdate !== undefined) {
                try {
                    item.OnUpdate();
                } catch (e) {
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
                item.OnStart(communicator, dependencies);
            }catch(e){
            }
        }
    });
    managePublic.loadLastCharacter();

    $scope.modules = manageModules.activeComponents;

}]);

