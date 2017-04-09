var accountId = "accountId";

g.services.accountService = {
    // pass takes an account object
    // fail takes an error
    GetAccount: function (pass,notFound, fail) {

        // try to load from memory
        var id = window.localStorage.getItem(accountId);
        if (id!= null
            && false
            ){
            g.services.AWSConnector.GetAccount(
                id,
                function (result) {
                    // TODO transfrom
                    pass(result)
                },
                notFound,
                fail);
        } else {

            var account = g.models.newAccount();

            g.services.AWSConnector.saveAccount(
                account.id,
                account.name,
                JSON.stringify(account.json()),
                function (result) {
                    window.localStorage.setItem(accountId, account.id);
                    pass(account)
                },
                fail)
        }

        //      pull from awe, return
        // if there is nothing, generate some random ones
        //      put it in aws, return
    }
};

