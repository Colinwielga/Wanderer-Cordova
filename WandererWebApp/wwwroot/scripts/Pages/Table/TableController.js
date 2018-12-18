g.getTableController = function ($timeout, message) {

    var createMiniature = function (name, occupation, xPosition, yPosition, img) {
        return {
            text: name,
            occupation: occupation,
            realX: xPosition,
            realY: yPosition,
            img: img,
            x: function () { return this.realX + "px"; },
            y: function () { return this.realY + "px"; },
            onDragComplete: function (data, event) {
                // we moved over by 110,110

                var finalX = event.originalEvent.clientX; // number 210
                var finalY = event.originalEvent.clientY; // number 285

                var moveX = finalX - this.initX; // moveX is a number +110
                var moveY = finalY - this.initY; // moveY is a number +110

                this.realX = this.realX + moveX;
                this.realY = this.realY + moveY;
            },
            onDragStart: function (data, event) {
                this.initX = event.originalEvent.clientX;// number 100
                this.initY = event.originalEvent.clientY;// number 175
            }
        };
    };

    var thing = [
        createMiniature("hal 9000", "Computer", 100, 100, "images/cards/0.jpg"),
        createMiniature("spock", "Science Officer", 200, 200, "images/cards/1.jpg"),
        createMiniature("yoda", "Jedi Master", 666, 333, "images/cards/2.jpg"),
        createMiniature("mace windu", "Jedi Master", 333, 666, "images/cards/3.jpg"),
        createMiniature("prince", "Musician", 250, 750, "images/cards/4.jpg"),
        createMiniature("einstein", "Physicist", 750, 250, "images/cards/5.jpg"),
    ];
    
    // ☣☣☣ warning! highly contagious. 
    // one looper is started it can not be stopped
    //var looper = function () {
    //    thing.push(createMiniature("zombie", "undead", Math.random() * 1000, Math.random() * 1000,"images/cards/6.jpg"))
    //    g.services.timeoutService.$timeout(looper, 1000)
    //};

    //looper();
    // ☣☣☣ warning! highly contagious 

    var toReturn = {
        message: message,
        tableObjects: function () {
            return thing;
        }
    };
    return toReturn;
};