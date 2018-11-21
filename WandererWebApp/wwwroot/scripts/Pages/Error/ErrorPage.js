g.ErrorPageFactory = function (controller) {
    return {
        getController: function () {
            return controller;
        },
        getHmtl: function () {
            return "scripts/Pages/Error/ErrorPage.html";
        },
        displayName: function () {
            return "Error";
        },
        canClose: function () {
            return true;
        }
    };
};