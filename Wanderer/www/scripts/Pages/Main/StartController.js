g.getStartController = function ($timeout) {
    var toReturn = {
        account: null,
        error: null,
        setAccount: function (account) {
            this.account = account;
        },
        setError: function (error) {
            this.error = error;
        }
    }

    g.services.accountService.GetAccount(function(account) {
        $timeout(function () { toReturn.setAccount(account) });
    }, function (error) {
        $timeout(function () { toReturn.setError(error) });
    });

    return toReturn;
}