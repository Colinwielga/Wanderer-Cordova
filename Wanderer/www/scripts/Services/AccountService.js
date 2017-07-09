var AccountList = "AccountList";

g.services.accountService = {
    // pass takes an account object
    // fail takes an error
    currentAccount: null,
    GetAccount: function (pass, notFound, fail) {
        // try to load from memory
        var accountsString = window.localStorage.getItem(AccountList);
        if (accountsString != null) {
            var accounts = angular.fromJson(accountsString);

            g.services.AWSConnector.GetAccount(
                accounts[0],
                function (result) {
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
                null,
                angular.toJson(account.json()),
                function (result) {
                    window.localStorage.setItem(AccountList, angular.toJson([account.id]));
                    g.services.accountService.currentAccount = account;
                    pass(account)
                },
                fail)
        }

        //      pull from awe, return
        // if there is nothing, generate some random ones
        //      put it in aws, return
    },
    saveAccount: function (pass, fail) {
        g.services.AWSConnector.saveAccount(
            g.services.accountService.currentAccount.id,
            g.services.accountService.currentAccount.name,
            g.services.accountService.currentAccount.Email,
            angular.toJson(g.services.accountService.currentAccount.json()),
            pass,
            fail)
    },
    SwitchAccount: function (id, pass, notFound, fail, remember) {
        remember = typeof remember !== 'undefined' ? remember : true;
        var accountsString = window.localStorage.getItem(AccountList);
        var accounts;
        if (accountsString == null) {
            accounts = [];
        } else {
            var accounts = angular.fromJson(accountsString);
        }
        g.services.AWSConnector.GetAccount(
            id,
            function (result) {
                if (remember) {
                    var at = accounts.indexOf(id);
                    if (at != -1) {
                        accounts.splice(at, 0);
                    }
                    accounts.splice(0, 0, id);
                    window.localStorage.setItem(AccountList, angular.toJson(accounts));
                }
                transformed = g.models.accountFormJSONstring(result)
                g.services.accountService.currentAccount = transformed;
                pass(result)
            },
            notFound,
            fail);
    },
    RecoverAccount: function (email, pass, notFound, fail) {
        email = email.toLowerCase();
        g.services.AWSConnector.GetAccountIdsForEmail(
            email,
            function (ids) {
                g.services.AWSConnector.CanSendTo(
                    email,
                    function () {
                        if (ids.length == 0) {
                            notFound();
                        } else {
                            var message = "Wander accounts assocated with this email:\n"
                            for (var i = 0; i < ids.length; i++) {
                                message += ids[i] + "\n";
                            }
                            message += "\n";
                            message += "if this eamil was sent in error (or other complants), please contact: WandererRolePlaying@gmail.com";
                            g.services.AWSConnector.sendEmail(email, message, pass, fail);

                        }
                    },
                    function () {
                        fail("account request not to recieve emails");
                    },
                    fail)
            }
            ,fail);
    }
};

