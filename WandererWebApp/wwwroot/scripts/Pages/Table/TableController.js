g.getTableController = function ($timeout, message) {
    var toReturn = {
        message: message,
        tableObjects: function () {
            return [{
                text: "spock",  occupation: "Officer"}, {
                text: "hal 9000",
                occupation: "Computer",
                }, {
                text: "yoda",
                occupation: "Jedi Master"
                }];
        }
    };
    return toReturn;
};