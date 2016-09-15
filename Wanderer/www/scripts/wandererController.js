App.controller('wandererController', ['$scope', function ($scope) {

    window.localStorage.clear();

    $scope.modules = g.Wanderer.components;

    $scope.newCharacter = function () {
        var d = new Date();
        var now = d.getTime();
        $scope.charactor = {id:now};
        g.Wanderer.components.forEach(function (item) {
            if (item.OnNewCharacter !== undefined) {
                try {
                    item.OnNewCharacter();
                } catch (e) {
                }
            }
        });
        $scope.save();
    }

    $scope.Load = function (charName) {
        //TODO handle bad names

        // we load the last character used
        var last = window.localStorage.getItem(charName);//undefined;//
        var tempChar = undefined;
        if (last !== undefined) {
            tempChar = JSON.parse(last);
        }

        // we generate a default character
        $scope.charactor = tempChar;//$scope.newCharacter();

        g.Wanderer.components.forEach(function (item) {
            if (item.OnLoad !== undefined) {
                try {
                    item.OnLoad();
                } catch (e) {
                }
            }
        });
    }

    $scope.save = function () {

        g.Wanderer.components.forEach(function (item) {
            if (item.OnSave !== undefined) {
                try {
                    item.OnSave();
                } catch (e) {
                }
            }
        });

        //we make sure your character is at the end of the charactorlist
        var charactorListString = window.localStorage.getItem("charactorlist");
        if (charactorListString != undefined) {
            $scope.characterList = JSON.parse(charactorListString);
        } else {
            $scope.characterList = [];
        }

        var characterIndex = $scope.characterList.indexOf($scope.charactor.id);
        if (characterIndex !== -1) {
            $scope.characterList.splice(characterIndex, 1);
        }
        $scope.characterList.push($scope.charactor.id);
        charactorListString = JSON.stringify($scope.characterList);
        window.localStorage.setItem("charactorlist", charactorListString);


        // save your character
        var output = JSON.stringify($scope.charactor);
        window.localStorage.setItem($scope.charactor.id, output);

        //setTimeout(function () {
        //    save();
        //}
        //, 1000);
    }

    $scope.onUpdate = function () {
        $scope.save();
        var toRezie = $(".auto-resize");
        for (var i = 0; i < toRezie.length; i++) {
            var target = toRezie[i];
            target.style.height = "1px";
            target.style.height = (25 + target.scrollHeight) + "px";
        }
        return "on upate";
    }

    // we load the character
    $scope.characterList = [];
    var charactorListString = window.localStorage.getItem("charactorlist");
    if (charactorListString !== undefined && charactorListString !== null) {
        $scope.characterList = JSON.parse(charactorListString);
    }


    g.Wanderer.components.forEach(function (item) {
        var comFactory = function (comp) {
            comp.read = function (key) {
                return $scope.charactor[item.getId()][key];
            }
            comp.canRead = function (key) {
                return $scope.charactor[item.getId()] !== undefined && $scope.charactor[item.getId()][key] !== undefined;
            }
            comp.write = function (key, value) {
                if ($scope.charactor[item.getId()] === undefined) {
                    $scope.charactor[item.getId()] = {};
                }
                $scope.charactor[item.getId()][key] = value;
                
            }
            return comp;
        }
        var communicator = comFactory(item);
        if (item.OnStart !== undefined) {
            try {
                var dependencies = [];
                if (item.getRequires !== undefined) {
                    var lookingFors = item.getRequires();
                    lookingFors.forEach(function (lookingFor) {
                        var fondOne = false;
                        g.Wanderer.components.forEach(function (inner) {
                            if (!fondOne && lookingFor === inner.getId()) {
                                fondOne = true;
                                dependencies.push(inner.getPublic())
                            }
                        });
                        if (!fondOne) {
                            var stupid = 0;
                            //TODO!! something this is bad
                        }
                    });
                }
                item.OnStart(communicator, dependencies);
            }catch(e){
            }
        }
    });

    if ($scope.characterList.length > 0) {
        $scope.Load($scope.characterList[$scope.characterList.length - 1]);
    } else {
        $scope.newCharacter();
    }
}]);

