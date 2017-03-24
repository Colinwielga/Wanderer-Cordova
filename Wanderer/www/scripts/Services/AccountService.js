// What a mess!
// we I get an account do I have to get all it's characters?
// I can probably get those when I try to load them?

function makeid(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

g.services.accountService = {
    // pass takes an account object
    // fail takes an error
    GetAccount: function (pass, fail) {

        var wrappedPass = function (result) {
            // TODO transfrom
            pass()
        }
        var notFound = function () {
            // we need a common error type or something...
            fail()
        }

        // try to load from memory
        var accountName = window.localStorage.getItem("accountName");
        var accountAccessKey = window.localStorage.getItem("accountAccessKey");
        if (accountName!= null &&
            accountAccessKey != null
            ){
            g.services.AWSConnector.GetAccount(
                accountName,
                accountAccessKey,
                wrappedPass,
                notFound,
                fail);
        } else {
            accountName = makeid(10);
            accountAccessKey = makeid(10);

            var json = {...}
            g.services.AWSConnector.saveAccount(
                accountName,
                accountAccessKey,
                json,
                wrappedPass,
                fail)
        }

        //      pull from awe, return
        // if there is nothing, generate some random ones
        //      put it in aws, return
    }
};