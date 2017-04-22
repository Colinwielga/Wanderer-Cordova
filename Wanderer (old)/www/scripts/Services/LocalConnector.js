//// NOT SUPPORTED


//// local provider

//ColinWielgaDyanmo.localProvider = {};

//ColinWielgaDyanmo.localProvider.SaveCharacter = function (name, adventure, password, json, good, gameMissing, bad) {
//    var characterList = [];
//    var charactorListString = window.localStorage.getItem("charactorlist");
//    if (charactorListString !== undefined) {
//        characterList = JSON.parse(charactorListString);
//    }

//    var characterIndex = characterList.indexOf(name);
//    if (characterIndex !== -1) {
//        characterList.splice(characterIndex, 1);
//    }
//    characterList.push(name);
//    charactorListString = JSON.stringify(characterList);
//    window.localStorage.setItem("charactorlist", charactorListString);

//    // update json:
//    //that.JSONEditor.updateJson(that.getPublic().getJSON())

//    // save your character
//    window.localStorage.setItem(name, json);
//    good();
//}


//ColinWielgaDyanmo.localProvider.GetCharacter = function (name, adventure, password, good, gameDoesNotExist, characterDoesNotExist, bad) {
//    // we load the last character used
//    var last = window.localStorage.getItem(name);//undefined;//
//    var tempChar = {};
//    if (last !== undefined && last !== null) {
//        tempChar = JSON.parse(last);
//        good(tempChar);
//    } else {
//        characterDoesNotExist();
//    }

//}

//ColinWielgaDyanmo.localProvider.getCharacters = function (adventure, password, good, gameDoesNotExist, bad) {
//    var characterList = [];
//    var charactorListString = window.localStorage.getItem("charactorlist");
//    if (charactorListString !== undefined) {
//        characterList = JSON.parse(charactorListString);
//    }
//    good(characterList);

//}

////ColinWielgaDyanmo.localProvider.CheckGameExists = function (adventure, password, does, doesnot, bad){

////}

////ColinWielgaDyanmo.awsProvider.MakeGame = function (adventure, password, good, gameTaken, bad) {

////}

