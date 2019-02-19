g.WikiPageFactory = function (controller) {
    return {
        getController: function () {
            return controller;
        },
        getHmtl: function () {
            return "scripts/Pages/Wiki/WikiPage.html";
        },
        displayName: function () {
            return "Wiki";
        },
        canClose: function () {
            return true;
        }
    };
};
