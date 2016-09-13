App.controller('wandererController', ['$scope', function ($scope) {

    $scope.newCharacter = function () {
        var d = new Date();
        var now = d.getTime();
        $scope.charactor = {};
        g.Wanderer.components.forEach(function (item) {
            item.OnNewCharacter();
        });
        save();
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
            item.OnLoad();
        });
    }

    $scope.Load($scope.characterList[$scope.characterList.length - 1]);

    $scope.getCharName = function (id) {
        var json = window.localStorage.getItem(id);
        var tempChar = JSON.parse(json);
        return tempChar.name;
    }

    $scope.save = function () {

        g.Wanderer.components.forEach(function (item) {
            item.OnSave();
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

    $scope.getImage = function (id) {
        return Card.getCard(id).getImage();
    }

    $scope.getName = function (id) {
        return Card.getCard(id).name;
    }

    $scope.getText = function (id) {
        return Card.getCard(id).text;
    }

    $scope.draw = function () {
        if ($scope.charactor.cards.length < Card.deckSize()) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = Card.draw();
                fail = false;
                for (var i = 0; i < $scope.charactor.cards.length; i++) {
                    if ($scope.charactor.cards[i] === num) {
                        fail = true;
                        break;
                    }
                }
            }
            $scope.charactor.cards.push(num);
        }
    };
    $scope.discard = function (cardID) {
        for (var i = 0; i < $scope.charactor.cards.length; i++) {
            if ($scope.charactor.cards[i] === cardID) {
                $scope.charactor.cards.splice(i, 1);
            }
        }
    };

    // TODO
    // you should be able to get pass with hard choice
    // I think I want to add indeterminate and roll it in with fail with some gain and pass with some loss
    $scope.roll = function (center) {
        var publicOutcomes = [];
        var privateOutcomes = [];

        var rollLevel = function (DCh, DCl, result) {
            this.DCh = DCh;
            this.DCl = DCl;
            this.result = result;
            this.getDC = function () {
                if (DCh === DCl) {
                    return DCh;
                } else {
                    return DCh + " - " + DCl;
                }
            }
        };

        var flip = function (x) {
            if (x === undefined) x = .5;

            return Math.random() < x;
        };

        // lst is expected to look like
        // [{odds:.2, result:"fail"}]
        var pick = function (lst) {
            var roll = Math.random();
            var at = 0;
            for (var i = 0; i < lst.length; i++) {
                at += lst[i].odds;
                if (roll < at) {
                    return lst[i].result;
                }
            }
        }

        // place pass or hard choice
        var includeHardChoice = flip(.25);
        var includePass = includeHardChoice ? flip(.4) : true;
        var includeCriticalPass = flip(.3);
        var showCriticalPass = flip();
        var showPass = flip(.75) || showCriticalPass || includeHardChoice;
        var DC = center + Math.round(Roll.roll(2.5)) + (includeHardChoice ? Math.floor(Math.abs(Roll.roll(5))) : 0);


        var publicAbove = "";
        var privateAbove = "";

        // sometime place critical pass
        if (includeCriticalPass) {
            var DCCriticalPass = DC + Math.ceil(Math.abs(Roll.roll(10)));
            // if it's bigger than 16 who cares
            if (DCCriticalPass < 16) {
                if (showCriticalPass) {
                    publicOutcomes.push(new rollLevel(publicAbove, DCCriticalPass,
                        "critical pass"));
                    publicAbove = DCCriticalPass - 1;
                } else {
                    privateOutcomes.push(new rollLevel(privateAbove, DCCriticalPass,
                        "critical pass"));
                }
                privateAbove = DCCriticalPass - 1;
            }
        }

        if (includePass) {
            if (showPass) {
                publicOutcomes.push(new rollLevel(publicAbove, DC,
                    "pass"));
                publicAbove = DC - 1;
            } else {
                privateOutcomes.push(new rollLevel(privateAbove, DC,
                "pass"));
            }
            privateAbove = DC - 1;
        }

        if (includeHardChoice) {
            var DCHardChoice = includePass ? privateAbove - Math.floor(Math.abs(Roll.roll(5))) : DC;
            publicOutcomes.push(new rollLevel(publicAbove,
                DCHardChoice,
                "hard choice"));
            publicAbove = DCHardChoice - 1;
            privateAbove = DCHardChoice - 1;
        } else {
            if (flip(.3) && showPass) {
                var DCPassAtACost = privateAbove - Math.floor(Math.abs(Roll.roll(4)));
                publicOutcomes.push(new rollLevel(publicAbove,
                    DCPassAtACost,
                    "mixed or undetermine"));
                publicAbove = DCPassAtACost - 1;
                privateAbove = DCPassAtACost - 1;
            }
        }

        //what remains is fail and cirtical fail
        // fail just takes up the remaining space so the first thing we need to know is if there will be a critical fail
        if (flip(.3)) {
            var DCCriticalFail = privateAbove - 1 - Math.floor(Math.abs(Roll.roll(10)));

            if (DCCriticalFail >= 0) {

                if (DCCriticalFail !== DCCriticalFail) {
                    var db = 0;
                }

                if (flip()) {
                    if (DCCriticalFail + 1 <= publicAbove) {
                        publicOutcomes.push(new rollLevel(publicAbove, DCCriticalFail + 1, "fail"));
                    }
                    publicOutcomes.push(new rollLevel(DCCriticalFail, "", "critical fail"));
                } else {
                    publicOutcomes.push(new rollLevel(publicAbove, "", "fail"));
                    privateOutcomes.push(new rollLevel(DCCriticalFail, "", "critical fail"));
                }
            }
        } else {
            publicOutcomes.push(new rollLevel(publicAbove, "",
            "fail"));
        }


        $scope.publicLastRoll = publicOutcomes;
        $scope.privateLastRoll = privateOutcomes;
    }

    var hpMover = function () {
        return 1 + Math.min(Math.max(-.9, Roll.roll(1)), 1);
    }

    $scope.hit = function () {
        var dif = hpMover();
        if ($scope.charactor.encounterHP > dif){
            $scope.charactor.encounterHP-= dif;
        }else{
            dif -= $scope.charactor.encounterHP;
            $scope.charactor.encounterHP = 0;
            $scope.charactor.hp -= dif;
        }
        $scope.charactor.encounterHP = Math.floor($scope.charactor.encounterHP * 10) / 10;
        $scope.charactor.hp = Math.floor($scope.charactor.hp * 10) / 10;
    }

    $scope.heal = function () {
        $scope.charactor.hp += hpMover();
        $scope.charactor.encounterHP = Math.floor($scope.charactor.encounterHP * 10) / 10;
        $scope.charactor.hp = Math.floor($scope.charactor.hp * 10) / 10;
    }

    $scope.recoverEncounterHP = function () {
        $scope.charactor.encounterHP = 4;
    }


    // we load the character
    $scope.characterList = ["autosave"];
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
                if ($scope.charactor[item.getId()] !== undefined) {
                    $scope.charactor[item.getId()] = {};
                }$scope.charactor[item.getId()][key] =value;
                
            }
            return comp;
        }
        var communicator = comFactory(item);
        item.OnStart(communicator);
    });
}]);

