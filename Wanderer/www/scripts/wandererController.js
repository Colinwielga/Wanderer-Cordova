App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {

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



    //awsPublic.loadLastCharacter();

}]);

