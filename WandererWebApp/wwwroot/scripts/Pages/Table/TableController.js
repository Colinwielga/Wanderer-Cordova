g.getTableController = function ($timeout, message) {

    var allMiniatures = [];

    // first we join a colabrative session
    var key = "test key";
    var groupName = "test group";
    g.services.SingnalRService.Join(groupName, key);
    
    g.services.SingnalRService.tryRemoveCallback(key);

    g.services.SingnalRService.setCallback(key,
        groupName,
        function (message) { return message.module === "table"; },
        function (message) {
            g.services.timeoutService.$timeout(function () {
                // logic
                // we got a message we should handle it!

                // for now we will just log
                // run it!
                console.log("got a message:", message);

                // check if the message is a move
                if (message.message === "miniature moved") {

                    // acces the right miniature and update that

                    for (let miniature of allMiniatures) {
                        if (miniature.text === message.text) {
                            miniature.realX = message.locationX;
                            miniature.realY = message.locationY;
                        }
                    }
                    
                    // TODO update the position of the right miniature
                }
                if (message.message === "miniature created") {

                    var isNewToUs = true;

                    for (let miniature of allMiniatures) {
                        if (miniature.text === message.text) {
                            isNewToUs = false;
                        }
                    }

                    if (isNewToUs) {
                        createMiniature(message.text, message.occupation, message.locationX, message.locationY, message.img, false)
                    }
                }



            });
        });

    var createMiniature = function (name, occupation, xPosition, yPosition, img, sendMessage) {
        var miniature = {
            text: name,
            occupation: occupation,
            realX: xPosition,
            realY: yPosition,
            img: img,
            x: function () { return this.realX + "px"; },
            y: function () { return this.realY + "px"; },
            onDragComplete: function (data, event) {

                var finalX = event.originalEvent.clientX; 
                var finalY = event.originalEvent.clientY; 

                var moveX = finalX - this.initX;
                var moveY = finalY - this.initY; 

                this.realX = this.realX + moveX;
                this.realY = this.realY + moveY;

                // TODO send a message to tell the world we moved a miniature

                g.services.SingnalRService.Send(key,
                    {
                        module: "table",
                        message: "miniature moved",
                        text: name,
                        locationX: this.realX,
                        locationY: this.realY
                    });

            },
            onDragStart: function (data, event) {
                this.initX = event.originalEvent.clientX;// number 100
                this.initY = event.originalEvent.clientY;// number 175
            }
        };

        allMiniatures.push(miniature)// add mini to our lsit

        if (sendMessage) {
            g.services.SingnalRService.Send(key,
                {
                    module: "table",
                    message: "miniature created",
                    text: name,
                    img: img,
                    occupation: occupation,
                    locationX: xPosition,
                    locationY: yPosition
                });
        }
    };
    
    createMiniature("hal 9000", "Computer", 100, 100, "images/cards/0.jpg", false);
    createMiniature("spock", "Science Officer", 200, 200, "images/cards/1.jpg", false);
    createMiniature("yoda", "Jedi Master", 666, 333, "images/cards/2.jpg", false);
    createMiniature("mace windu", "Jedi Master", 333, 666, "images/cards/3.jpg", false);
    createMiniature("prince", "Musician", 250, 750, "images/cards/4.jpg", false);
    createMiniature("einstein", "Physicist", 750, 250, "images/cards/5.jpg", false);
    
    
    
    // ☣☣☣ warning! highly contagious. 
    // one looper is started it can not be stopped
    //var looper = function () {
    //    createMiniature("zombie" + Math.random(), "undead", Math.random() * 1000, Math.random() * 1000, "images/cards/6.jpg", true);
    //    g.services.timeoutService.$timeout(looper, 1000);
    //};

    //looper();
    // ☣☣☣ warning! highly contagious 

    var toReturn = {
        message: message,
        tableObjects: function () {
            return allMiniatures;
        }
    };
    return toReturn;
};