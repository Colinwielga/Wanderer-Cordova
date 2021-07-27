var component = function () {

    var messageDisplayableMaker = {
        CanDisplay: function(message){
            // we display messages when moduleId matches ours and its not an auto message
            return message.autoMessage !== true && message.displayerModule === that.getId();
        },
        ConvertToDisplayable:function(message){
            return {
                getHtml: function(){ return "modules/wanderer-core-ledger/message.html";},
                getModel: function(){ return message;}
            };
        }
    };

    var autoMessageDisplayableMaker = {
        CanDisplay: function(message){
            // we display auto messages when it is an auto message and moduleId matches ours
            return message.autoMessage === true && message.displayerModule === that.getId();
        },
        ConvertToDisplayable:function(message){
            return {
                getHtml: function(){ return "modules/wanderer-core-ledger/auto-message.html";},
                getModel: function(){ return message;}
            };
        }
    };

    // a list of things that know how to display messages
    this.displayableMakers = [messageDisplayableMaker, autoMessageDisplayableMaker];

    this.displayables = [];

    this.joined = false;

    this.getId = function () {
        return "wanderer-core-ledger";
    };

    this.getSystem = function () {
        return "Core"
    };

    var that = this;
    this.key = Math.random() + "";

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.page = page;
        dependencies[0].onJoin(this.OnJoinCallBack);
    };

    this.OnJoinCallBack = function(groupName){
        g.services.SignalRService.tryRemoveCallback(that.key);
        g.services.SignalRService.setCallback(
            that.key,
            groupName,
            that.ShouldHandleMessage,
            that.OnMessageCallBack);
        g.services.timeoutService.$timeout(function () {
            that.joined = true;
        })
        that.getPublic().AutoMessage(" has joined the game session.");
    };

    this.ShouldHandleMessage = function(message){
        return message.module === that.getId();
    };

    this.WrittenMessage = "";

    this.OnMessageCallBack = function(message){
        g.services.timeoutService.$timeout(function() {

            console.log("got a message!")

            var objDiv = document.getElementById("message-holder");
            
            // when the ledger is closed 
            // objDiv closed
            if (objDiv != null) {
                var wasAtBottom = !(Math.abs(objDiv.scrollHeight - (objDiv.scrollTop + objDiv.offsetHeight)) > 5);
            }
            
            for (let displayableMaker of that.displayableMakers) {
                if (displayableMaker.CanDisplay(message)){
                    var displayable = displayableMaker.ConvertToDisplayable(message);
                    that.displayables.push(displayable);

                    // scoll to bottom
                    // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div


					// console.log("check scroll", wasAtBottom, objDiv.scrollTop, objDiv.offsetHeight, objDiv.scrollHeight);
                    g.services.timeoutService.$timeout(function() {
                        if (objDiv != null) {
                            if (wasAtBottom){
                                objDiv.scrollTop = objDiv.scrollHeight;
                            }
                        }
                    });

                    return;
                }
            }

        });
    };

    this.SendMessage = function (){
        console.log("ledger test")
        g.services.SignalRService.Send(this.key, {
            text: that.WrittenMessage,
            timestamp: Date.now(),
            sender: that.page.name,
            module: that.getId(),
            displayerModule : that.getId()
        });
        this.WrittenMessage = "";
    };

    this.OnNewCharacter = function () {
        this.messages = [];
        var that = this;
    };
    this.OnSave = function () {};
    this.OnLoad = function () {};
    this.getRequires = function () {
        return ["wanderer-core-save"];
    };
    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            },
            PublicSendMessage: function (message) {
                g.services.SignalRService.Send(that.key, {
                    text: message,
                    timestamp: Date.now(),
                    sender: that.page.name,
                    module: that.getId(),
                    displayerModule: that.getId(),
                    autoMessage: false,
                });
            },
            AutoMessage: function (message) {
                g.services.SignalRService.Send(that.key, {
                    text: message,
                    timestamp: Date.now(),
                    sender: that.page.name,
                    module: that.getId(),
                    displayerModule: that.getId(),
                    autoMessage: true,
                });
            },
            PublicSendDisplayableMessage: function(message){
                message.module = that.getId();
                g.services.SignalRService.Send(that.key,message);
            },
            AddDisplayableMaker: function(displayableMaker){
                that.displayableMakers.push(displayableMaker);
            }
        };
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getTitle = function () {
        return "Ledger";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(component);
