g.services.SystemService = {
    // pass takes an account object
    // fail takes an error
    GetSystem: function ( accessKey, good, doesNotExist, fail) {
        g.services.AWSConnector.GetSystem(
            accessKey,
            good,
            doesNotExist,
            fail);
    },
    SaveSystem: function (accessKey,name,json,good,doesNotExist, fail) {
        g.services.AWSConnector.SaveSystem(
                accessKey,
                name,
                json,
                good,
                doesNotExist,
                fail);
    }
};
