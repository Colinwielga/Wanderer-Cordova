
function makeid(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var defaultLength 

g.models.newAccount = function (accountName, accountAccessKey, characterAccessers) {
    characterAccessers = (typeof characterAccessers !== 'undefined') ? characterAccessers : [];
    accountName = (typeof accountName !== 'undefined') ? accountName: makeid(20);
    accountAccessKey = (typeof accountAccessKey !== 'undefined') ?accountAccessKey: makeid(20);

    return {
        name: accountName,
        accessKey: accountAccessKey,
        characterAccessers: characterAccessers,
        json: function () {
            return {
                characterAccessers: characterAccessers
            };
        },
    }
}

g.models.accountFormJSONstring = function (json) {
    // TODO parse the JSON
    var parsed = JSON.parse(json);
    var accountName = parsed["name"];
    var accountAccessKey = parsed["accessKey"];
    var characterAccessers = [];
    var list = parsed["characterAccessers"];
    for (var i = 0; i < list.length; i++) {
        var characterName = list[i]["name"];
        var characterKey = list[i]["accessKey"];
        characterAccessers.push(g.models.newCharacterAccesser(characterName, characterKey));
    }
    return g.models.newAccount(accountName, accountAccessKey, characterAccessers);
}

g.models.newCharacterAccesser = function (charterName, charterAccessKey) {
    return {
        name: charterName,
        accessKey: charterName
    }
}


//g.models.characterAccesserFormJSONstring = function (json) {
//}