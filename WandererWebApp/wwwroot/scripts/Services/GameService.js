g.services.GameService = {
    // pass takes an account object
    // fail takes an error
    GetGame: function ( accessKey, good, doesNotExist, fail) {
        g.services.AWSConnector.GetGame(
            accessKey,
            good,
            doesNotExist,
            fail);
    },
    SaveGame: function (accessKey,name,json,good,doesNotExist, fail) {
        g.services.AWSConnector.SaveGame(
                accessKey,
                name,
                json,
                good,
                doesNotExist,
                fail);
    }
};
