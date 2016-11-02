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

ColinWielgaDyanmo.SaveCharacter = function (name, adventure, password, json, good, gameMissing, bad) {

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

    ColinWielgaDyanmo.CheckGameExists(adventure, password, actullySaveCharacter,gameMissing, bad);
}


//SaveCharacter("Mr Lee", "TestAdventure","303", JSON.stringify({}))

ColinWielgaDyanmo.GetCharacter = function (name, adventure, password, good,gameDoesNotExist, bad) {
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
            bad(err);
        } else {
            good(data);
        }
    });
};
ColinWielgaDyanmo.CheckGameExists(adventure, password, actullyGetCharacter, gameDoesNotExist, bad);
}

//GetCharacter("Mr Lee", "TestAdventure","303")

ColinWielgaDyanmo.getCharacters = function (adventure, password, good,gameDoesNotExist, bad) {
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
                good(data);
            }
        });
    };
    ColinWielgaDyanmo.CheckGameExists(adventure, password, actullyGetCharacters, gameDoesNotExist, bad);
}

ColinWielgaDyanmo.CheckGameExists = function (adventure, password, does,doesnot, bad) {
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

ColinWielgaDyanmo.MakeGame = function (adventure, password, good, gameTaken,bad) {
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
    ColinWielgaDyanmo.CheckGameExists(adventure, password, gameTaken, actullyMakeGame, bad);
}

//ColinWielgaDyanmo.MakeGame("Colin.Test", "303", function () {

//}, function () {

//}, function() {

//})

//getCharacters("TestAdventure", "303")