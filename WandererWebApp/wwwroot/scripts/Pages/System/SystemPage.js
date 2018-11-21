g.SystemPageFactory = function (sys) {
    return {
        getController: function () {
            return sys;
        },
        getHmtl: function () {
            return "scripts/Pages/Character/CharacterPage.html";
        },
        displayName: function () {
            return sys.displayName();
        },
        canClose: function () {
            return true;
        }
    };
};
