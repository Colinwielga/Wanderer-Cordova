App.controller('wandererController', ['$scope', '$timeout', function ($scope, $timeout) {
    g.services.timeoutService.$timeout = $timeout;
    
    var saving = false;

    $scope.onUpdate = function () {
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = 25 + target.scrollHeight + "px";
        }

        // ==================================================== Auto save
        var activePage = g.services.pageService.activePage().getController().exposedPage;
        
        if (activePage) {

            if (!saving){
                
                saving = true;

                var newJson = activePage.getJSON();
                
                var reallySave = function () {
                    g.services.characterService.SaveCharacter(
                        activePage.accessKey, 
                        activePage.name,
                        angular.toJson(newJson),
                        function (data) {
                            console.log("Save Successful!");
                            var changed = g.services.accountService.currentAccount.addChatacterAccesser(g.models.newCharacterAccesser(activePage.accessKey, activePage.name));
                            if (changed) {
                                g.services.accountService.saveAccount(function () { }, function () {
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

                // check to see if there are changes
                var changes = !activePage.compareWithLastLoaded(activePage.getJSON());      
                if (changes) {
                    // if there are changes, go ahead and save
                    g.services.characterService.GetCharacter(
                        activePage.accessKey, 
                        function (json) {
                            var ok = activePage.compareWithLastLoadedAndUpdate(json["json"]);
                            if (ok) {
                                reallySave();
                                activePage.updateLastLoaded(newJson);
                            } else {
                                console.log("Save Failed, Merge Conflicts!");
                                saving = false;
                            }
                        },
                        function (error) {
                            reallySave();
                        },
                        function (error) {
                            console.log("Error: " + error);
                            saving = false;
                        });

                } else { 
                    console.log("you didn't change anything");
                    saving = false;
                }
            }
        }
        //====================================================

        return "on update";
    };

    $scope.Pages = g.services.pageService.GetPages();

    g.services.pageService.GetAccount();
    g.services.pageService.LoadWiki();
    //g.services.pageService.LoadTable();
    
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