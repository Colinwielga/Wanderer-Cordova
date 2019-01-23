g.getTableController = function ($timeout, message) {

    var allMiniatures = [];

    var id = Math.random() + "";

    var toReturn = {
        message: message,
        tableObjects: function () {
            return allMiniatures;
        },
        addZombie: function () {
            createMiniature(Math.random() + "",
                "zombie" + Math.random(),
                "undead",
                Math.random() * 500,
                Math.random() * 500,
                "images/cards/6.jpg",
                true);
        }
    };

    // first we join a colabrative session
    var key = "test key";
    var groupName = "test group";
    g.services.SingnalRService.Join(groupName, key);
    
    g.services.SingnalRService.tryRemoveCallback(key);

    g.services.SingnalRService.setCallback(key,
        groupName,
        function (message) { return message.module === "table" && message.SendBy !== id; },
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
                        if (miniature.miniatureId === message.miniatureId) {
                            miniature.realX = message.locationX;
                            miniature.realY = message.locationY;
                        }
                    }
                    
                    // TODO update the position of the right miniature
                }
                if (message.message === "miniature created") {

                    var isNewToUs = true;

                    for (let miniature of allMiniatures) {
                        if (miniature.miniatureId === message.miniatureId) {
                            isNewToUs = false;
                        }
                    }

                    if (isNewToUs) {
                        createMiniature(message.miniatureId, message.text, message.occupation, message.locationX, message.locationY, message.img, false);
                    }
                }
            });
        });

    var createMiniature = function (miniatureId,name, occupation, xPosition, yPosition, img, sendMessage) {
        var miniature = {
            miniatureId: miniatureId,
            text: name,
            occupation: occupation,
            realX: xPosition,
            realY: yPosition,
            img: img,
            lastSent: 0,
            getHtml: function () {
                return "scripts/pages/Table/tableObject.html";},
            x: function () { return this.realX + "px"; },
            y: function () { return this.realY + "px"; },
            move: function (data, event,alwaysSend) {

                var currentX = event.originalEvent.clientX; 
                var currentY = event.originalEvent.clientY; 

                var moveX = currentX - this.lastX;
                var moveY = currentY - this.lastY;
                
                this.lastX = currentX;
                this.lastY = currentY;

                this.realX = this.realX + moveX;
                this.realY = this.realY + moveY;

                var now = (new Date).getTime();

                if (now - this.lastSent > 100 || alwaysSend){
                    g.services.SingnalRService.Send(key,
                        {
                            miniatureId: this.miniatureId,
                            module: "table",
                            message: "miniature moved",
                            text: name,
                            locationX: this.realX,
                            locationY: this.realY,
                            SendBy: id
                        });
                    this.lastSent = now;
                }
            },
            onDragComplete: function (data, event) {
                this.move(data, event,true);
            },
            onDragMove: function (data, event) {
                this.move(data, event,false);
            },
            onDragStart: function (data, event) {
                this.lastX = event.originalEvent.clientX;// number 100
                this.lastY = event.originalEvent.clientY;// number 175
            }
        };

        allMiniatures.push(miniature);

        if (sendMessage) {
            g.services.SingnalRService.Send(key,
                {
                    miniatureId: miniature.miniatureId,
                    module: "table",
                    message: "miniature created",
                    text: name,
                    img: img,
                    occupation: occupation,
                    locationX: xPosition,
                    locationY: yPosition,
                    SendBy: id
                });
        }

    };
    
    createMiniature("362834729","hal 9000", "Computer", 0, 0, "images/cards/0.jpg", false);
    createMiniature("758341938","spock", "Science Officer", 200, 200, "images/cards/1.jpg", false);
    createMiniature("789519764","yoda", "Jedi Master", 666, 333, "images/cards/2.jpg", false);
    createMiniature("249751635","mace windu", "Jedi Master", 333, 666, "images/cards/3.jpg", false);
    createMiniature("824691375","prince", "Musician", 250, 750, "images/cards/4.jpg", false);
    createMiniature("548547623","einstein", "Physicist", 750, 250, "images/cards/5.jpg", false);
    
    
    



    return toReturn;
};