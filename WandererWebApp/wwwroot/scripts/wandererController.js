App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {
    g.services.timeoutService.$timeout = $timeout;
    
    $scope.onUpdate = function () {
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = 25 + target.scrollHeight + "px";
        }
        return "on update";
    };

    $scope.Pages = g.services.pageService.GetPages();

    g.services.pageService.GetAccount();
    g.services.pageService.LoadWiki();
    g.services.pageService.LoadTable();
    
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

