g.services.AWSConnector = {};

AWS.config.region = 'us-east-1';
AWS.config.dynamoDbCrc32 = false;

g.services.AWSConnector.dynamodb = new AWS.DynamoDB();

g.services.AWSConnector.WandererCharacters = 'WandererCharacters';
g.services.AWSConnector.WandererAccounts = 'WandererAccounts';

// AWS provider
g.services.AWSConnector.SaveThing = function (id, accessKey, table, json, good, bad) {
    var itemParams = {
        Item: {
            "Name": { "S": id },
            "AccessKey": { "S": accessKey },
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

g.services.AWSConnector.SaveCharacter = function (id, accessKey, json, good, bad) {
    g.services.AWSConnector.SaveThing(id, accessKey, g.services.AWSConnector.WandererCharacters, json, good, bad);
}

g.services.AWSConnector.saveAccount = function (id, accessKey,json, good, bad) {
    g.services.AWSConnector.SaveThing(id, accessKey, g.services.AWSConnector.WandererAccounts, json, good, bad);
}

g.services.AWSConnector.GetThing = function (name, accessKey, table, good, characterDoesNotExist, bad) {
    var itemParams = {
        "Key": {
            "Name": { "S": name },
            "AccessKey": { "S": accessKey },
        },
        "TableName": table
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item === null) {
                characterDoesNotExist()
            } else {
                good(JSON.parse(data.Item.JSON.S));
            }
        }
    });
}

g.services.AWSConnector.GetCharacter = function (name, accessKey, good, characterDoesNotExist, bad) {
    g.services.AWSConnector.GetThing(name, accessKey, g.services.AWSConnector.WandererCharacters, good, characterDoesNotExist, bad);
}

g.services.AWSConnector.GetAccount = function (id, accessKey, good, accountDoesNotExist, bad) {
    g.services.AWSConnector.GetThing(name, accessKey, g.services.AWSConnector.WandererAccounts, good, characterDoesNotExist, bad);
}
