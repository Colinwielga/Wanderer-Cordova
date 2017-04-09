g.services.characterService = {
    // pass takes an account object
    // fail takes an error
    GetCharacter: function (name,accessKey,pass,doesNotExist, fail) {
        g.services.AWSConnector.GetCharacter(
            name,
            accessKey,
            JSON.stringify(account.json()),
            doesNotExist,
            fail);
    }
};

