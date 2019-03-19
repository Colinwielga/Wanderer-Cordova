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

    let reDraw = function (){
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
            //here is something need to change
            // stroke used to be a list a of points
            // now stroke is an object

            // you can use 'for (let .. of LIST)'
            // and it goes through all the items in the list
            // not so much for an onject
            // so what we need to do is get the list out of the object

            // any guess on ??
            //stroke. is a good start
            // look up at where we create stroke 
            // what does it have?

            // the names of things stroke has are on the left side of the :
            // so it has color and points
            // where you see
            // "points:[startingPoint]"
            // that sets the Strokes points property to [startintPoint]
            // [] is a new list 
            // [startingPoint] is a list with the item startingPoint in it
            // so points:[startingPoint]
            // sets the object's points property to a list of points this is just the starting point
            
            // confused?

            // yeah
            
            // only two legel things are:

            // stroke.color and stroke.points
            // stroke only has the stuff on the left of the :

            // I think that is all we have to do
            
            // it does not work?
            // oh so it really does not work


            var list = stroke.points;
            // I put it there
            for (let point of list) {
                
                // add points to the path
                if (first ){
                    context.moveTo(point.x, point.y);
                    first = false;
                }else {
                    context.lineTo(point.x, point.y);
                }
                                    
            }
            context.stroke();
        }
    };
    
    var id = Math.random() + "";

    // toReturn is the controller
    var toReturn = {
        drawTool:false,
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
            if (this.drawTool === true){
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
        mouseUp: function(event){
            if (this.drawTool === true) {
                this.mouseIsDown = false;
                var stroke = allStrokes[allStrokes.length - 1];

                var point = {
                    x: event.originalEvent.layerX,
                    y: event.originalEvent.layerY
                };

                // here!
                // here!
                // same problem
                // stroke is not a list 
                // we can not push it 
                // stroke is an object
                // add the new point to the end
                //👍
                stroke.points.push(point);
                reDraw();
            }
        },

        mouseDown: function(event){
            if (this.drawTool === true) {
                this.mouseIsDown = true;

                var point = {
                    x: event.originalEvent.layerX,
                    y: event.originalEvent.layerY
                };
                
                // this looks good to me
                // we need to make a few more changes
                // since we changed how strokes work
                // we have to update everything that was using strokes
                // haha
                // so the big thing that was using stroke is reDraw
                // so let's update that

                // one more issue!
                // I just found
                // I am just going to fix it
                // it is a stupid this
                // try now
                // we need to get the color off the encolsing object
                // I will try to explain
                // but I think it really requires a full lecture
                // awww yeah!

                // so this...

                // sometimes you make and object
                // and the object needs to refer to it self
                // when it needs to do that it uses 'this'
                // 
                let x =0;
                let object = {
                    x:5,
                    getX:function(){
                        //return x;// if we just write x we get 0
                        return this.x // if we write this.x we 5
                        // it is crazy
                        // a little crazy

                    }
                }


                var stroke = makeStroke(this.color, point);
                allStrokes.push(stroke);

                // I was in the wrong visual studio
                //

                // so this line is not so good
                // stroke used to be a list
                // so stroke.push made a lot of sense
                // push adds to the end of the list
                // but now not so much 
                // raised eyebrow emoji
                // stroke.
                // right we get the list of points the stroke has
                // and we add the new point to them

                // we could also write this in the more compact:
                // 👍
                // yeah just simplifed it a little
                stroke.points.push(point);
                reDraw();
                
            }
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