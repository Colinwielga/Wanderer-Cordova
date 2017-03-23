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

    $scope.Pages = [
        g.MainPageFactory(g.getStartController()),
        g.CharacterPageFactory(new g.Character($timeout))
    ];

    $scope.Select = function (page) {
        $scope.activePage = page;
    }

    $scope.Selected = function (page) {
        return $scope.activePage === page;
    }

    $scope.Close = function (page) {
        var at = $scope.Pages.indexOf(page);
        if (at >= 0) {
            $scope.Pages.splice(at, 1);
        }
    }

    $scope.Add = function () {
        $scope.Pages.push(new g.Character($timeout));
        $scope.activePage = $scope.Pages[$scope.Pages.length - 1];
    }

    $scope.activePage = $scope.Pages[0];

}]);

