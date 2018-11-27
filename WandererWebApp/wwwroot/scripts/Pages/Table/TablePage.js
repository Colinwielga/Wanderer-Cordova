g.TablePageFactory = function (controller) {
    return {
        getController: function () {
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