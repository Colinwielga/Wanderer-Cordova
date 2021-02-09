g.getLoadingController = function (message) {
    var toReturn = {
        message: message,
        styleClass: function () {
            return { darkMode: false, funMode: false };
        }
    };
    return toReturn;
};