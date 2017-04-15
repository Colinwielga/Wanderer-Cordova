
g.CharacterPageFactory = function (char) {
    return {
        getController: function() {
            return char;
        },
        getHmtl: function () {
            return "scripts/Pages/Character/CharacterPage.html";
        },
        displayName: function () {
            return char.displayName();
        },
        canClose: function () {
            return true;
        }
    }
}
