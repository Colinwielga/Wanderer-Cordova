g.savers = {};

g.makeSaver = function (accessKey, name, newJson) {
    var func = function () {
        g.services.characterService.SaveCharacter(
            accessKey,
            name,
            angular.toJson(newJson),
            function (data) {
                console.log("Save Successful!");
                var changed = g.services.accountService.currentAccount.addChatacterAccesser(g.models.newCharacterAccesser(accessKey, name));
                if (changed) {
                    g.services.accountService.saveAccount(
                        function () {
                            console.log("added to account");
                        },
                        function () {
                            throw { message: "Save Failed" };
                        });
                }
                saving = false;
            },
            function (error) {
                console.log("Save Failed " + error);
                saving = false;
            });
        console.log("really save");
    };

    g.savers[accessKey + "-" + name] = func;

    setTimeout(function () {
        if (g.savers[accessKey + "-" + name] === func) {
            func();
            g.services.timeoutService.$timeout(function () {
                delete g.savers[accessKey + "-" + name];
            });
        }
    }, 1000);
};

App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {
    g.services.timeoutService.$timeout = $timeout;
    
    $scope.onUpdate = function () {
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = 25 + target.scrollHeight + "px";
        }

        var activePage = g.services.pageService.activePage().getController().exposedPage;

        if (activePage && activePage.AutoSave === true) {

            var newJson = activePage.getJSON();
                
            // check to see if there are changes
            var changes = activePage.lastLoaded === undefined || activePage.lastLoaded === null || !activePage.compareWithLastLoaded(activePage.getJSON());      
            if (changes) {
                activePage.updateLastLoaded(newJson);
                g.makeSaver(activePage.accessKey, activePage.name, newJson);
            } 
        }

        return "on update";
    };

    $scope.saving = function () {
        for (var key in g.savers) {
            if (g.savers.hasOwnProperty(key))
                return true;
        }
        return false;
    };

    $scope.Pages = g.services.pageService.GetPages();

    g.services.pageService.GetAccount();
    g.services.pageService.LoadWiki();
    // g.services.pageService.LoadTable();
    
    $scope.activePage = function () {
        return g.services.pageService.activePage();
    };
    
    $scope.Select = function (page) {
        g.services.pageService.Select(page);
    };

    $scope.Selected = function (page) {
        return g.services.pageService.Selected(page);
    };

    $scope.Close = function (page) {
        g.services.pageService.Close(page);
    };
}

]);