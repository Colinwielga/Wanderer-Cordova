var WandererController = {};

WandererController.Pages = {
    Character: "Character",
    Map: "Map",
    Connie:"Connie"
}

App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.page = WandererController.Pages.Character;

    $scope.onUpdate = function () {
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = (25 + target.scrollHeight) + "px";
        }
        return "on update";
    }

    $scope.Characters = [new g.Character($timeout)];

    $scope.Select = function (char) {
        $scope.page = WandererController.Pages.Character;
        $scope.activeCharacter = char;
    }

    $scope.Selected = function (char) {

        return $scope.activeCharacter == char;
    }

    $scope.Add = function () {
        $scope.Characters.push(new g.Character($timeout));
        $scope.activeCharacter = $scope.Characters[$scope.Characters.length-1];
    }

    $scope.activeCharacter = $scope.Characters[0];

    $scope.IsMap = function () {
        return $scope.page == WandererController.Pages.Map;
    }

    $scope.IsConivance = function () {
        return $scope.page == WandererController.Pages.Connie;
    }

    $scope.IsCharacter = function () {
        return $scope.page == WandererController.Pages.Character;
    }



    $scope.Map = function () {
        $scope.page = WandererController.Pages.Map;
    }

    $scope.Connie = function () {
        $scope.page = WandererController.Pages.Connie;
    }

}]);