var component = function () {

    this.getId = function () {
        return "wanderer-core-ledger";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        // this.key = Math.random() + "";
        // dependencies[0].onJoin(groupName => {
        //     g.services.SignalRService.tryRemoveCallback(that.key);
        //     g.services.SignalRService.setCallback(that.key,
        //         groupName,
        //         function (message) {return true;},
        //         function (message) {
                    



        //          }
        //         );
            
        // });
    };
    
    this.AddToLedger = function (sender, text, timestamp){ 
        var message = {};
        message.sender = sender;
        message.text = text;
        message.timestamp = timestamp;
        this.messages.push(message);
        console.log("logged")
    } 

    this.OnNewCharacter = function () {
        this.messages = []; 
        var that = this;
        g.services.timeoutService.$timeout(function(){
            that.AddToLedger("sender", "text", "timestamp");
        })
        
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
};

g.services.componetService.registerCharacter(component);