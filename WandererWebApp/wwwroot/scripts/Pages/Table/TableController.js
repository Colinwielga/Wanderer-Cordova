g.getTableController = function ($timeout, message) {

    var allMiniatures = [];

    var id = Math.random() + "";

    var toReturn = {
        message: message,
        tableObjects: function () {
            return allMiniatures;
        },
        addBossMonster: function () {
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                "images/cards/15.jpg",
                true,
                "scripts/Pages/Table/boss-monster.html");
        },
        addZombie: function () {// {
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                "images/cards/6.jpg",
                true,
                "scripts/Pages/Table/round-miniature.html");
        },
        addTerrain: function (imagePath) { //
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                imagePath,
                true, 
                "scripts/Pages/Table/terrain.html");
        },
        addWall: function () {

            var wallNumber = Math.round((Math.random() * 5) + 10); /*todo get random number between 1 and 6*/

            createMiniature(
                    Math.random() + "",
                    Math.random() * 500,
                    Math.random() * 500,
                    'images/wall' + wallNumber + '.png',
                    true,
                    "scripts/Pages/Table/terrain.html");
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
                        createMiniature(message.miniatureId, message.locationX, message.locationY, message.img, false, message.htmlPath);
                    }
                }
            });
        });

    var createMiniature = function (miniatureId, xPosition, yPosition, img, sendMessage, htmlPath) {
        var miniature = {
            miniatureId: miniatureId,
            realX: xPosition,
            realY: yPosition,
            img: img,
            lastSent: 0,
            getHtml: function () {
                return htmlPath;
            },
            x: function () { return this.realX + "px"; },
            y: function () { return this.realY + "px"; },
            move: function (data, event, alwaysSend, rounded) {

                var currentX = event.originalEvent.clientX;
                var currentY = event.originalEvent.clientY;

                var moveX = currentX - this.lastX;
                var moveY = currentY - this.lastY;

                this.lastX = currentX;
                this.lastY = currentY;

                this.realX = this.realX + moveX;
                this.realY = this.realY + moveY;
                
                if (rounded) {
                    this.realX = Math.round(this.realX / 100) * 100;
                    this.realY = Math.round(this.realY / 100) * 100;
                }
                
                var now = (new Date).getTime();

                if (now - this.lastSent > 100 || alwaysSend){
                    g.services.SingnalRService.Send(key,
                        {
                            miniatureId: this.miniatureId,
                            module: "table",
                            message: "miniature moved",
                            locationX: this.realX,
                            locationY: this.realY,
                            SendBy: id
                        });
                    this.lastSent = now;
                }
            },
            onDragComplete: function (data, event) {
                this.move(data, event, true, true);
            },
            onDragMove: function (data, event) {
                this.move(data, event, false, false);
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
                    img: img,
                    locationX: xPosition,
                    locationY: yPosition,
                    SendBy: id,
                    hmtlPath: htmlPath
                });
        }

    };
    
    createMiniature("362834729", 0, 0, "images/cards/0.jpg", false, "scripts/Pages/Table/round-miniature.html");
    createMiniature("758341938", 200, 200, "images/cards/1.jpg", false, "scripts/Pages/Table/round-miniature.html");
    createMiniature("789519764", 666, 333, "images/cards/2.jpg", false, "scripts/Pages/Table/round-miniature.html");
    createMiniature("249751635", 333, 666, "images/cards/3.jpg", false, "scripts/Pages/Table/round-miniature.html");
    createMiniature("824691375", 250, 750, "images/cards/4.jpg", false, "scripts/Pages/Table/round-miniature.html");
    createMiniature("548547623", 750, 250, "images/cards/5.jpg", false, "scripts/Pages/Table/round-miniature.html");
    
    
    



    return toReturn;
};