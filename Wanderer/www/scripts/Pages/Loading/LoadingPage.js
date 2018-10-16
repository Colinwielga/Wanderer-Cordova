g.LoadingPageFactory = function (message) {
    var controller = g.getLoadingController(message);
    return {
        getController: function () {
            return controller;
        },
        getHmtl: function () {
            return "scripts/Pages/Loading/LoadingPage.html";
        },
        displayName: function () {
            return this.getController().message;
        },
        canClose: function () {
            return true;
        }
    }
}