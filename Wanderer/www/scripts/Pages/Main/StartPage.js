g.MainPageFactory = function (controller) {
    return {
        getController: function () {
            return controller;
        },
        getHmtl: function () {
            return "scripts/Pages/Character/CharacterPage.html";
        },
        displayName: function () {
            return "Start";
        },
        canClose: function () {
            return false;
        }
    };
};