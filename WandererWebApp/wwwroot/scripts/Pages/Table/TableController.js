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
                {
                    imagePath: "images/cards/15.jpg"
                },
                true,
                "scripts/Pages/Table/boss-monster.html");
        },
        addZombie: function () {// {
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                {
                    imagePath: "images/cards/6.jpg"
                },
                true,
                "scripts/Pages/Table/round-miniature.html");
        },
        addTerrain: function (imagePath) { //
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                {
                    imagePath: imagePath
                },
                true, 
                "scripts/Pages/Table/terrain.html");
        },
        addWall: function () {

            var wallNumber = Math.round((Math.random() * 5) + 10); 

            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                {
                    imagePath: 'images/wall' + wallNumber + '.png'
                },
                true,
                "scripts/Pages/Table/terrain.html");
        },
        addLabel: function () {
            createMiniature(
                Math.random() + "",
                Math.random() * 500,
                Math.random() * 500,
                {
                    text: this.labelText
                }, 
                false,
                "scripts/Pages/Table/Label.html");
        },
        labelText: "",
        removeAll: function () {
            allMiniatures = [];
            // todo publish 
        },
        remove: function (toRemove) { 
            var nextList = [];
            for (let miniature of allMiniatures) {
                if (miniature.miniatureId !== toRemove.miniatureId) {
                    nextList.push(miniature); 
                }   
            }
            allMiniatures = nextList;
            // todo publish
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

    var createMiniature = function (miniatureId, xPosition, yPosition, miniatureData, sendMessage, htmlPath) {
        var miniature = {
            miniatureId: miniatureId,
            realX: xPosition,
            realY: yPosition,
            miniatureData: miniatureData,
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

    return toReturn;
};