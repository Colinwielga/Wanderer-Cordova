var ColinWielgaDyanmo = {};


AWS.config.region = 'us-east-1';
AWS.config.dynamoDbCrc32 = false;

ColinWielgaDyanmo.dynamodb = new AWS.DynamoDB();

ColinWielgaDyanmo.WandererCharacters = 'WandererCharacters';
ColinWielgaDyanmo.WandererAdventures = 'WandererAdventures';
//http://stackoverflow.com/a/22429679/2608464
ColinWielgaDyanmo.hashFnv32a= function(str, seed) {

    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    // Convert to 8 digit hex string
    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);

}

ColinWielgaDyanmo.superHash= function(adventure, password) {
    var hash1 = ColinWielgaDyanmo.hashFnv32a(adventure, password);
    var hash2 = ColinWielgaDyanmo.hashFnv32a(hash1, password);
    var hash3 = ColinWielgaDyanmo.hashFnv32a(hash1, adventure);
    return hash1 + "-" + hash2 + "-" + hash3;
}

// AWS provider

ColinWielgaDyanmo.awsProvider = {};

ColinWielgaDyanmo.awsProvider.SaveCharacter = function (name, adventure, password, json, good, gameMissing, bad) {

    var actullySaveCharacter = function () {

        //TODO does it need to be put or update??

        var itemParams = {
            Item: {
                "Name": { "S": name },
                "Adventure": { "S": adventure },
                "AdventureHash": { "S": ColinWielgaDyanmo.superHash(adventure, password) },
                "JSON": { "S": json }
            },
            "TableName": ColinWielgaDyanmo.WandererCharacters
        };

        ColinWielgaDyanmo.dynamodb.putItem(itemParams, function (err, data) {
            if (err) {
                bad(err);
            } else {
                good(data);
            }
        });
    }

    ColinWielgaDyanmo.awsProvider.CheckGameExists(adventure, password, actullySaveCharacter, gameMissing, bad);
}

ColinWielgaDyanmo.awsProvider.GetCharacter = function (name, adventure, password, good, gameDoesNotExist, characterDoesNotExist, bad) {
    var actullyGetCharacter = function ()
    {
        var hash = ColinWielgaDyanmo.superHash(adventure, password);

    var itemParams = {
        "Key": {
            "AdventureHash": { "S": ColinWielgaDyanmo.superHash(adventure, password) },
            "Name": { "S": name }
        },
        "TableName": ColinWielgaDyanmo.WandererCharacters
    };
    ColinWielgaDyanmo.dynamodb.getItem(itemParams, function (err, data) {
        //data.Item.JSON;
        if (err) {
            //TODO maybe call characterDoesNotExist

            bad(err);
        } else {
            if (data.Item == null) {
                characterDoesNotExist()
            } else {
                good(JSON.parse(data.Item.JSON.S));
            }
        }
    });
};
    ColinWielgaDyanmo.awsProvider.CheckGameExists(adventure, password, actullyGetCharacter, gameDoesNotExist, bad);
}

//GetCharacter("Mr Lee", "TestAdventure","303")

ColinWielgaDyanmo.awsProvider.getCharacters = function (adventure, password, good, gameDoesNotExist, bad) {
    //TODO tell them if the game does not exist?
    var actullyGetCharacters = function () {
        var itemParams = {
            "Select": "ALL_ATTRIBUTES",
            "TableName": ColinWielgaDyanmo.WandererCharacters,
            "Limit": 100,
            "KeyConditionExpression": "AdventureHash = :hash",
            "ExpressionAttributeValues": { ":hash": { "S": ColinWielgaDyanmo.superHash(adventure, password) } }
        };
        ColinWielgaDyanmo.dynamodb.query(itemParams, function (err, data) {
            if (err) {
                bad(err);
            } else {
                var list = [];
                for (var i = 0; i < data.Items.length; i++) {
                    list.push(data.Items[i].Name.S)
                }

                good(list);
            }
        });
    };
    ColinWielgaDyanmo.awsProvider.CheckGameExists(adventure, password, actullyGetCharacters, gameDoesNotExist, bad);
}

ColinWielgaDyanmo.awsProvider.CheckGameExists = function (adventure, password, does, doesnot, bad) {
    var hash = ColinWielgaDyanmo.superHash(adventure, password);

    var itemParams = {
        "Key": {
            "Adventure": { "S": adventure }
        },
        "TableName": ColinWielgaDyanmo.WandererAdventures
    };
    ColinWielgaDyanmo.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            //TODO
        } else {
            if (data.Item === undefined) {
                doesnot(data);
            } else {
                does(data)
            }
        }
    });
}

ColinWielgaDyanmo.awsProvider.MakeGame = function (adventure, password, good, gameTaken, bad) {
    var actullyMakeGame =function(data){
        var itemParams = {
            Item: {
                "Adventure": { "S": adventure },
                "AdventureHash": { "S": ColinWielgaDyanmo.superHash(adventure, password) },
                "Owner": {"S":"ColinWielga@gmail.com"}
            },
            "TableName": ColinWielgaDyanmo.WandererAdventures
        };

        ColinWielgaDyanmo.dynamodb.putItem(itemParams, function (err, data) {
            if (err) {
                bad(err);
            } else {
                good(data);
            }
        });
    }
    ColinWielgaDyanmo.awsProvider.CheckGameExists(adventure, password, gameTaken, actullyMakeGame, bad);
}

// local provider

ColinWielgaDyanmo.localProvider = {};

ColinWielgaDyanmo.localProvider.SaveCharacter = function (name, adventure, password, json, good, gameMissing, bad) {
    var characterList = [];
    var charactorListString = window.localStorage.getItem("charactorlist");
    if (charactorListString != undefined) {
        characterList = JSON.parse(charactorListString);
    } 

    var characterIndex = characterList.indexOf(name);
    if (characterIndex !== -1) {
        characterList.splice(characterIndex, 1);
    }
    characterList.push(name);
    charactorListString = JSON.stringify(characterList);
    window.localStorage.setItem("charactorlist", charactorListString);

    // update json:
    //that.JSONEditor.updateJson(that.getPublic().getJSON())

    // save your character
    window.localStorage.setItem(name, json);
    good();
}


ColinWielgaDyanmo.localProvider.GetCharacter = function (name, adventure, password, good, gameDoesNotExist,characterDoesNotExist, bad) {


    // we load the last character used
    var last = window.localStorage.getItem(name);//undefined;//
    var tempChar = {};
    if (last !== undefined && last !== null) {
        tempChar = JSON.parse(last);
        good(tempChar);
    } else {
        characterDoesNotExist();
    }

}

ColinWielgaDyanmo.localProvider.getCharacters = function (adventure, password, good, gameDoesNotExist, bad) {
    var characterList = [];
    var charactorListString = window.localStorage.getItem("charactorlist");
    if (charactorListString != undefined) {
        characterList = JSON.parse(charactorListString);
    }
    good(characterList);

}

//ColinWielgaDyanmo.localProvider.CheckGameExists = function (adventure, password, does, doesnot, bad){
   
//}

//ColinWielgaDyanmo.awsProvider.MakeGame = function (adventure, password, good, gameTaken, bad) {
   
//}

// JSON provider... TODO

ColinWielgaDyanmo.jsonProvider = {};

ColinWielgaDyanmo.jsonProvider.SaveCharacter = function (name, adventure, password, json, good, gameMissing, bad){
    //TODO uhhhh?
}

// are these even used?
ColinWielgaDyanmo.jsonProvider.GetCharacter = function (name, adventure, password, good, gameDoesNotExist,characterDoesNotExist, bad) {
    characterDoesNotExist()
}


