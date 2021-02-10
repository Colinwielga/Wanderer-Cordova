g.getWikiController = function ($timeout, message) {
    var toReturn = {
        message: message,
        styleClass: function () {
            return { darkMode: false, funMode: false };
        }
    };
    return toReturn;
};

