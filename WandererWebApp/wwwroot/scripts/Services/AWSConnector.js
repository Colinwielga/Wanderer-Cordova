// only services should access this
// it is not really a service 

g.services.AWSConnector = {};

AWS.config.region = 'us-east-1';
AWS.config.dynamoDbCrc32 = false;

g.services.AWSConnector.dynamodb = new AWS.DynamoDB();

g.services.AWSConnector.WandererCharacters = 'WandererCharacters2';
g.services.AWSConnector.WandererAccounts = 'WandererAccounts';
g.services.AWSConnector.WandererGames = 'WandererGames';
g.services.AWSConnector.WandererSystems = 'WandererSystems';
g.services.AWSConnector.DoNotContact = 'DoNotContact';

// ############## Character 

g.services.AWSConnector.SaveCharacter = function (id, name, json, good, bad) {
    var itemParams = {
        Item: {
            "id": { "S": id },
            "name": { "S": name },
            "JSON": { "S": json },
        },
        "TableName": g.services.AWSConnector.WandererCharacters
    };
    g.services.AWSConnector.dynamodb.putItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good(data);
        }
    });
}

g.services.AWSConnector.GetCharacter = function (id, good, doesNotExist, bad) {
    var itemParams = {
        "Key": {
            "id": { "S": id }
        },
        "TableName": g.services.AWSConnector.WandererCharacters
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item == null) {
                doesNotExist()
            } else {
                var obj = {};
                obj["json"] = JSON.parse(data.Item.JSON.S);
                if (data.Item.name != null) {
                    obj["name"] = data.Item.name.S;
                }
                obj["id"] = data.Item.id.S;
                good(obj);
            }
        }
    });
}

// ############## Account

g.services.AWSConnector.saveAccount = function (id, name, email, json, good, bad) {
    var itemParams = {
        Item: {
            "id": { "S": id },
            "JSON": { "S": json },
        },
        "TableName": g.services.AWSConnector.WandererAccounts
    };
    if (email !== undefined && email !== null && email !== "") {
        itemParams["Item"]["Email"] = { "S": email };
    }
    if (name !== null && name !== null && name !== "") {
        itemParams["Item"]["name"] = { "S": name };
    }

    g.services.AWSConnector.dynamodb.putItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good(data);
        }
    });
}

g.services.AWSConnector.GetAccount = function (id, good, doesNotExist, bad) {
    var itemParams = {
        "Key": {
            "id": { "S": id }
        },
        "TableName": g.services.AWSConnector.WandererAccounts
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item == null) {
                doesNotExist()
            } else {
                var obj = {};
                obj["json"] = JSON.parse(data.Item.JSON.S);
                if (data.Item.name != null) {
                    obj["name"] = data.Item.name.S;
                }
                obj["id"] = data.Item.id.S;
                if (data.Item.Email != null) {
                    obj["Email"] = data.Item.Email.S;
                }
                good(obj);
            }
        }
    });
}

// ############## Game

g.services.AWSConnector.saveGame = function (id, name, email, json, good, bad) {
    var itemParams = {
        Item: {
            "id": { "S": id },
            "JSON": { "S": json },
        },
        "TableName": g.services.AWSConnector.WandererGames
    };
    if (name !== null && name !== null && name !== "") {
        itemParams["Item"]["name"] = { "S": name };
    }

    g.services.AWSConnector.dynamodb.putItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good(data);
        }
    });
}

g.services.AWSConnector.GetGame = function (id, good, doesNotExist, bad) {
    var itemParams = {
        "Key": {
            "id": { "S": id }
        },
        "TableName": g.services.AWSConnector.WandererGames
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item == null) {
                doesNotExist()
            } else {
                var obj = {};
                obj["json"] = JSON.parse(data.Item.JSON.S);
                obj["id"] = data.Item.id.S;
                if (data.Item.name != null) {
                    obj["name"] = data.Item.name.S;
                }
                good(obj);
            }
        }
    });
}

// ############## System

g.services.AWSConnector.saveSystem = function (id, name, email, json, good, bad) {
    var itemParams = {
        Item: {
            "id": { "S": id },
            "JSON": { "S": json },
        },
        "TableName": g.services.AWSConnector.WandererSystems
    };
    if (name !== null && name !== null && name !== "") {
        itemParams["Item"]["name"] = { "S": name };
    }

    g.services.AWSConnector.dynamodb.putItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good(data);
        }
    });
}

g.services.AWSConnector.GetSystem = function (id, good, doesNotExist, bad) {
    var itemParams = {
        "Key": {
            "id": { "S": id }
        },
        "TableName": g.services.AWSConnector.WandererSystems
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item == null) {
                doesNotExist()
            } else {
                var obj = {};
                obj["json"] = JSON.parse(data.Item.JSON.S);
                obj["id"] = data.Item.id.S;
                if (data.Item.name != null) {
                    obj["name"] = data.Item.name.S;
                }
                good(obj);
            }
        }
    });
}

// returns a list of Ids
g.services.AWSConnector.GetAccountIdsForEmail = function (email, good, bad) {
    email = email.toLowerCase();

    var params = {
        KeyConditionExpression: "Email = :targetEmail",
        ExpressionAttributeValues: { ":targetEmail": {"S": email}},
        TableName: g.services.AWSConnector.WandererAccounts,
        IndexName: "Email-index"
    };
    g.services.AWSConnector.dynamodb.query(params, function (err, data) {
        if (err) {
            bad(err);
        } else {
            var res = [];
            for (var i = 0; i < data.Items.length; i++) {
                res.push(data.Items[i].id.S);
            }
            good(res);
        }
    });
}

g.services.AWSConnector.CanSendTo = function (email, yes, no, bad) {
    email = email.toLowerCase();
    var itemParams = {
        "Key": {
            "Email": { "S": email }
        },
        "TableName": g.services.AWSConnector.DoNotContact
    };
    g.services.AWSConnector.dynamodb.getItem(itemParams, function (err, data) {
        if (err) {
            bad(err);
        } else {
            if (data.Item == null) {
                yes();
            } else {
                no();
            }
        }
    });
}

//########################## SES

g.services.AWSConnector.ses = new AWS.SES();

g.services.AWSConnector.sendEmail = function (address, message, good, bad) {
    var params = {
        Destination: {
            ToAddresses: [
                address,
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: message
                },
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Wanderer Account"
            }
        },
        Source: "wandererroleplaying@gmail.com",
    };

    g.services.AWSConnector.ses.sendEmail(params, function (err, data) {
        if (err) {
            bad(err);
        } else {
            good()
        }
    });
}

//g.services.AWSConnector.sendEmail("ColinWielga@gmail.com", "this is test", function () { }, function (err) {})