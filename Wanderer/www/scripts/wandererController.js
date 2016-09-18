App.controller('wandererController', ['$scope', function ($scope) {
   

    $scope.onUpdate = function () {
        g.Wanderer.components.forEach(function (item) {
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
    $scope.modules = g.Wanderer.components;


    var managePublic = g.Wanderer.getComponent("wanderer-core-manage")
    g.Wanderer.components.forEach(function (item) {
        var communicator = managePublic.comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                var dependencies = [];
                if (item.getRequires !== undefined) {
                    var lookingFors = item.getRequires();
                    for (var i = 0; i < lookingFors.length; i++) {
                        dependencies.push(g.Wanderer.getComponent(lookingFors[i]));
                    }
                }
                item.OnStart(communicator, dependencies);
            }catch(e){
            }
        }
    });
    managePublic.loadLastCharacter();
}]);

