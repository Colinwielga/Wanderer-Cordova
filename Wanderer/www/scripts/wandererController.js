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
    $scope.activeIndex = 0;

    $scope.activePage = function () {
        return $scope.Pages[$scope.activeIndex]
    }

    g.services.accountService.GetAccount(function (account) {
        $timeout(function () {
            var at = $scope.Pages.indexOf(tempPage);
            var newPage = g.MainPageFactory(g.getStartController($timeout, account));
            $scope.Pages[at] = newPage;
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
        $scope.activeIndex = $scope.Pages.indexOf(page)
    }

    $scope.Selected = function (page) {
        return $scope.Pages.indexOf(page) === $scope.activeIndex;
    }

    $scope.Close = function (page) {
        var at = $scope.Pages.indexOf(page);
        if (at >= 0) {
            $scope.Pages.splice(at, 1);
        }
    }

    $scope.Add = function () {
        var newPage = g.CharacterPageFactory(new g.Character($timeout,"new character",g.makeid()));
        $scope.Pages.push(newPage);
        $scope.Select(newPage);
    }

    $scope.OpenCharacterById = function (id) {
        var tempPage = g.LoadingPageFactory($timeout, "loading " + id);
        $scope.Pages.push(tempPage);
        $scope.Select(tempPage);
        g.services.characterService.GetCharacter(id, function (json) {
            var at = $scope.Pages.indexOf(tempPage);
            var character = new g.Character($timeout, json["name"], json["id"]);
            character.load(json);
            $timeout(function () {
                $scope.Pages[at] = g.CharacterPageFactory(character);
            });
            // update the account
            var accessor = g.models.newCharacterAccesser(json["id"], json["name"]);
            var changed = g.services.accountService.currentAccount.addChatacterAccesser(accessor);
            if (changed) {
                g.services.accountService.saveAccount(function () { }, function () {
                    throw { message: "save failed" }
                })
            }

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

    $scope.OpenCharacter = function (characterAccessor) {
        $scope.OpenCharacterById(characterAccessor.id);
    }

    
    $scope.OpenAccount = function (id) {
        var tempPage = g.LoadingPageFactory($timeout, "loading account...");
        $timeout(function () {
            $scope.Pages[0] = tempPage;
        });
        return g.services.accountService.SwitchAccount(
            id,
            function (account) {
                $timeout(function () {
                    var at = $scope.Pages.indexOf(tempPage);
                    var newPage = g.MainPageFactory(g.getStartController($timeout, account));
                    $scope.Pages[at] = newPage;
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
        }
    }
]);

