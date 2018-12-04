g.TablePageFactory = function (controller) {
    return {
        getController: function () {
            console.debug("getController got called!");
            return controller;
        },
        getHmtl: function () {
            return "scripts/Pages/Table/TablePage.html";
        },
        displayName: function () {
            return "Table";
        },
        canClose: function () {
            return true;
        }
    };
};