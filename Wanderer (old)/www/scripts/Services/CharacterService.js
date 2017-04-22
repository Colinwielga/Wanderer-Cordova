g.services.characterService = {
    // pass takes an account object
    // fail takes an error
    GetCharacter: function ( accessKey, good, doesNotExist, fail) {
        g.services.AWSConnector.GetCharacter(
            accessKey,
            good,
            doesNotExist,
            fail);
    },
    SaveCharacter: function (accessKey,name,json,good,doesNotExist, fail) {
        g.services.AWSConnector.SaveCharacter(
                accessKey,
                name,
                json,
                good,
                doesNotExist,
                fail);
    }
};

