g.getTableController = function ($timeout, message) {

    let allStrokes = [];

    let makeStroke = function (color, startingPoint) {
        // huh it wants the { to be on the same line as the return...
        // that makes no sense to me
        // got any errors in the console?


        // you broke up, what line?

        return {
            color: color,
            points: [startingPoint]
        };
    };

    let allMiniatures = [];

    let reDraw = function () {
        // 💩 TODO Colin
        // the UI should reach in the controller for values
        // bad form for the controller to reach in to the UI and monkey 🐵
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext("2d");
        // wtf canvas how do you work??!
        // https://stackoverflow.com/questions/2892041/how-to-avoid-html-canvas-auto-stretching
        // TODO this only needs to be called once
        let hackyHackyHackHack = document.getElementById('hacky-hacky-hack-hack');
        canvas.width = hackyHackyHackHack.clientWidth;//4000;//
        canvas.height = hackyHackyHackHack.clientHeight;//4000;//

        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.lineJoin = "round";
        // this is another fun thing to play with!
        // line width
        context.lineWidth = 5;

        for (let stroke of allStrokes) {
            context.beginPath();
            // oh look we already did part!
            // here we are setting the color the pen is drawing with to the color on the stroke
            // naw, this is all good
            // I just wanted to point out that this color here on the right side
            context.strokeStyle = stroke.color;

            var first = true;

            var list = stroke.points;
            // I put it there
            for (let point of list) {

                // add points to the path
                if (first) {
                    context.moveTo(point.x, point.y);
                    first = false;
                } else {
                    context.lineTo(point.x, point.y);
                }

            }
            context.stroke();
        }
    };

    var id = Math.random() + "";

    // toReturn is the controller
    var toReturn = {
        drawTool: false,
        eraseTool: false,
        color: "#000000",
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
            allStrokes = [];
            reDraw();
            // todo publish 
        },
        activateDrawTool: function (color) {
            this.drawTool = true;
            this.eraseTool = false;
            this.color = color;
            reDraw();
        },
        activateEraseTool: function () {
            this.eraseTool = true;
            this.drawTool = false;
            reDraw();
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
        },
        mouseIsDown: false,
        mouseOver: function (event) {
            if (this.drawTool === true) {
                if (this.mouseIsDown === true) {
                    var stroke = allStrokes[allStrokes.length - 1];

                    var point = {
                        x: event.originalEvent.layerX,
                        y: event.originalEvent.layerY
                    };

                    // another one!
                    stroke.points.push(point);
                    reDraw();
                }
            }
        },
        mouseUp: function (event) {
            if (this.drawTool === true) {
                this.mouseIsDown = false;
                var stroke = allStrokes[allStrokes.length - 1];

                var point = {
                    x: event.originalEvent.layerX,
                    y: event.originalEvent.layerY
                };

                stroke.points.push(point);
                reDraw();
            }
        },

        mouseDown: function (event) {
            if (this.drawTool === true) {
                this.mouseIsDown = true;

                var point = {
                    x: event.originalEvent.layerX,
                    y: event.originalEvent.layerY
                };

                var stroke = makeStroke(this.color, point);
                allStrokes.push(stroke);

                stroke.points.push(point);
                reDraw();

            }
        },

        styleClass: function () {
            return { darkMode: false, funMode: false };
        }
    };

    // first we join a colabrative session
    //var key = "test key";
    //var groupName = "test group";
    //g.services.SignalRService.Join(groupName, key);

    g.services.SignalRService.tryRemoveCallback(key);

    g.services.SignalRService.setCallback(key,
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
                
                console.log(event);

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

                if (now - this.lastSent > 100 || alwaysSend) {
                    g.services.SignalRService.Send(key,
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
                this.lastX = event.originalEvent.clientX;
                this.lastY = event.originalEvent.clientY;
            }
        };

        allMiniatures.push(miniature);

        if (sendMessage) {
            g.services.SignalRService.Send(key,
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