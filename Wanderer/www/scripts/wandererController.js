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

    var tempPage = g.LoadingPageFactory($timeout, "loading account...");
    $scope.Pages = [tempPage];
    $scope.activePage = tempPage;

    g.services.accountService.GetAccount(function (account) {
        $timeout(function () {
            var at = $scope.Pages.indexOf(tempPage);
            $scope.Pages[at] = g.MainPageFactory(g.getStartController($timeout, account));
        });
    }, function (error) {
        $timeout(function () {
            var at = $scope.Pages.indexOf(tempPage);
            $scope.Pages[at] = g.ErrorPageFactory(new g.getErrorController($timeout, "Account not found"));
        });
    }, function (error) {
        $timeout(function () {
            var at = $scope.Pages.indexOf(tempPage);
            $scope.Pages[at] = g.ErrorPageFactory(new g.getErrorController($timeout, "Error: " + error));
        });
    });

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
        $scope.Pages.push(g.CharacterPageFactory(new g.Character($timeout)));
        $scope.activePage = $scope.Pages[$scope.Pages.length - 1];
    }

    $scope.OpenCharacter = function (characterAccessor) {
        var tempPage = g.LoadingPageFactory($timeout, "loading " + characterAccessor.name);
        $scope.Pages.push(tempPage);
        $scope.activePage = tempPage;
        g.services.characterService.GetCharacter(characterAccessor.name, characterAccessor.accessKey, function (character) {
            $timeout(function () {
                var at = $scope.Pages.indexOf(tempPage);
                $scope.Pages[at] = g.CharacterPageFactory(character);
            });
        }, function () {
            $timeout(function () {
                var at = $scope.Pages.indexOf(tempPage);
                $scope.Pages[at] = g.ErrorPageFactory(new g.getErrorController($timeout, "Character does not exist"));
            });
        }, function (err) {
            $timeout(function () {
                var at = $scope.Pages.indexOf(tempPage);
                $scope.Pages[at] = g.ErrorPageFactory(new g.getErrorController($timeout, "Error: " + err));
            });
        }
        )
    }

}]);

