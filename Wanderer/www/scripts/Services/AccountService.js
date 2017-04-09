g.services.accountService = {
    // pass takes an account object
    // fail takes an error
    GetAccount: function (pass,notFound, fail) {

        // try to load from memory
        var accountName = window.localStorage.getItem("accountName");
        var accountAccessKey = window.localStorage.getItem("accountAccessKey");
        if (accountName!= null &&
            accountAccessKey != null
            && false
            ){
            g.services.AWSConnector.GetAccount(
                accountName,
                accountAccessKey,
                function (result) {
                    // TODO transfrom
                    pass(result)
                },
                notFound,
                fail);
        } else {

            var account = g.models.newAccount();

            g.services.AWSConnector.saveAccount(
                account.name,
                account.accessKey,
                JSON.stringify(account.json()),
                function (result) {
                    window.localStorage.setItem("accountName", account.name);
                    window.localStorage.setItem("accountAccessKey", account.accessKey);
                    pass(account)
                },
                fail)
        }

        //      pull from awe, return
        // if there is nothing, generate some random ones
        //      put it in aws, return
    }
};

