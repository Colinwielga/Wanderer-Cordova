g.getTableController = function ($timeout, message) {
    var thing = [
        {
            text: "spock",
            occupation: "Officer",
            x: "100px", 
            y: "100px",
            onDragComplete: function (data, event) {
                this.x = (event.originalEvent.clientX - 50) + "px";
                this.y = (event.originalEvent.clientY - 172.5)+ "px";

                console.log("Event: ", event);
                console.log("Data: ", data);
            }
        },
        {
            text: "hal 9000",
            occupation: "Computer",
            x: "500px",
            y: "500px"
        },
        {
            text: "yoda",
            occupation: "Jedi Master",
            x: "666px",
            y: "333px"
        },
        {
            text: "mace windu",
            occupation: "Jedi Master",
            x: "333px",
            y: "666px"
        },
        {
            text: "prince",
            occupation: "Musician",
            x: "250px",
            y: "750px"
        },
        {
            text: "einstein",
            occupation: "Physicist",
            x: "750px",
            y: "250px"
        }
    ];

    var toReturn = {
        message: message,
        tableObjects: function () {
            return thing;
        }
    };
    return toReturn;
};