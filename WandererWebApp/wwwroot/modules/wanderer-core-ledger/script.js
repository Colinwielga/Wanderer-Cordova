var component = function () {

    this.getId = function () {
        return "wanderer-core-ledger";
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
    };

    this.ShouldHandleMessage = function(message){
        return message.module === that.getId();
    };

    this.WrittenMessage = "";

    this.OnMessageCallBack = function(message){
        g.services.timeoutService.$timeout(function() {
            that.messages.push(message);
        });
    };

    this.SendMessage = function (){
        g.services.SignalRService.Send(this.key, {
            text: that.WrittenMessage,
            timestamp: Date.now(),
            sender: that.page.name,
            module: that.getId(),
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
                });
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