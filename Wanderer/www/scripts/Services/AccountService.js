var accountId = "accountId";

g.services.accountService = {
    // pass takes an account object
    // fail takes an error
    currentAccount: null,
    GetAccount: function (pass,notFound, fail) {

        // try to load from memory
        var id = window.localStorage.getItem(accountId);
        if (id!= null){
            g.services.AWSConnector.GetAccount(
                id,
                function (result) {
                    // TODO transfrom
                    transformed = g.models.accountFormJSONstring(result)
                    g.services.accountService.currentAccount = transformed;
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
                    g.services.accountService.currentAccount = account;
                    pass(account)
                },
                fail)
        }

        //      pull from awe, return
        // if there is nothing, generate some random ones
        //      put it in aws, return
    },
    saveAccount: function (pass,fail) {
        g.services.AWSConnector.saveAccount(
                g.services.accountService.currentAccount.id,
                g.services.accountService.currentAccount.name,
                JSON.stringify(g.services.accountService.currentAccount.json()),
                pass,
                fail)
    },
    SwitchAccount: function (id, pass, notFound, fail) {
        g.services.AWSConnector.GetAccount(
                id,
                function (result) {
                    // TODO transfrom
                    transformed = g.models.accountFormJSONstring(result)
                    g.services.accountService.currentAccount = transformed;
                    pass(result)
                },
                notFound,
                fail);
    }
};

