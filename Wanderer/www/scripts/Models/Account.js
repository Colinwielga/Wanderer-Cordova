function makeid(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var defaultLength 

g.models.newAccount = function (id,name, characterAccessers) {
    characterAccessers = (typeof characterAccessers !== 'undefined') ? characterAccessers : [];
    name = (typeof name !== 'undefined') ?name: "unnammed";
    id = (typeof id !== 'undefined') ? id: makeid(40);
    
    return {
        id: id,
        name: name,
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
    var id = parsed["id"];
    var name = parsed["name"];
    var characterAccessers = [];
    var list = parsed["characterAccessers"];
    for (var i = 0; i < list.length; i++) {
        var charId = list[i]["id"];
        var charName = list[i]["name"];
        characterAccessers.push(g.models.newCharacterAccesser(charId, charName));
    }
    return g.models.newAccount(accountName,name, characterAccessers);
}

g.models.newCharacterAccesser = function (id, name) {
    return {
        id: id,
        name: name,
    }
}


//g.models.characterAccesserFormJSONstring = function (json) {
//}