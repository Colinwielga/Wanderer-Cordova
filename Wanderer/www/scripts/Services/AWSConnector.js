g.services.AWSConnector = {};

AWS.config.region = 'us-east-1';
AWS.config.dynamoDbCrc32 = false;

g.services.AWSConnector.dynamodb = new AWS.DynamoDB();

g.services.AWSConnector.WandererCharacters = 'WandererCharacters2';
g.services.AWSConnector.WandererAccounts = 'WandererAccounts';

// AWS provider
g.services.AWSConnector.SaveThing = function (id, name, table, json, good, bad) {
    var itemParams = {
        Item: {
            "id": { "S": id },
            "name":{"S": name},
            "JSON": { "S": json },
        },
        "TableName": table
    };
    g.services.AWSConnector.dynamodb.putItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good(data);
        }
    });
}

g.services.AWSConnector.SaveCharacter = function (id, name, json, good, bad) {
    g.services.AWSConnector.SaveThing(id,name, g.services.AWSConnector.WandererCharacters, json, good, bad);
}

g.services.AWSConnector.saveAccount = function (id, name, json, good, bad) {
    g.services.AWSConnector.SaveThing(id, name, g.services.AWSConnector.WandererAccounts, json, good, bad);
}

g.services.AWSConnector.GetThing = function (id,  table, good, doesNotExist, bad) {
    var itemParams = {
        "Key": {
            "id": { "S": id }
        },
        "TableName": table
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item === null) {
                doesNotExist()
            } else {
                good(JSON.parse(data.Item.JSON.S));
            }
        }
    });
}

g.services.AWSConnector.GetCharacter = function ( accessKey, good, characterDoesNotExist, bad) {
    g.services.AWSConnector.GetThing(accessKey, g.services.AWSConnector.WandererCharacters, good, characterDoesNotExist, bad);
}

g.services.AWSConnector.GetAccount = function (accessKey, good, accountDoesNotExist, bad) {
    g.services.AWSConnector.GetThing(accessKey, g.services.AWSConnector.WandererAccounts, good, accountDoesNotExist, bad);
}
