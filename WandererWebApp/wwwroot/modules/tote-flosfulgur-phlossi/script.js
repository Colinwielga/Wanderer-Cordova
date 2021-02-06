ToteFlosfulgurPhlossi.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-phlossi";
    };

    this.getSystem = function () {
        return "Flosfulgur"
    };

	this.key = Math.random() + "";
    this.OnStart = function (communicator, logger, page, dependencies) {
        dependencies[0].onJoin(this.OnJoinCallBack);
    };
    this.OnJoinCallBack = function(groupName){
        g.services.SignalRService.tryRemoveCallback(that.key);
        g.services.SignalRService.setCallback(
            that.key,
            groupName,
            that.ShouldHandleMessage,
            that.OnMessageCallBack
		);
        g.services.timeoutService.$timeout(function () {
            that.joined = true;
        })
    };
    this.ShouldHandleState = function(state){
        return message.module === that.getId();
    };
    this.OnMessageCallBack = function(message){
        g.services.timeoutService.$timeout(function() {

            var objDiv = document.getElementById("phlossi-surface");
            // var wasAtBottom = (objDiv.scrollTop + objDiv.offsetHeight) === objDiv.scrollHeight;

            // for (let displayableMaker of that.displayableMakers) {
            //     if (displayableMaker.CanDisplay(message)){
            //         var displayable = displayableMaker.ConvertToDisplayable(message);
            //         that.displayables.push(displayable);
			//
            //         // scoll to bottom
            //         // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
			//
			//
            //         g.services.timeoutService.$timeout(function() {
            //             if (wasAtBottom){
            //                 objDiv.scrollTop = objDiv.scrollHeight;
            //             }
            //         });
			//
            //         return;
            //     }
            // }

        });
    };

    this.OnNewCharacter = function () {
        // this.havePages = [];
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
        // this.communicator.write("havePages", this.getPageLabels(this.havePages));
    };

    this.OnLoad = function () {
        // var version = this.communicator.lastVersion();
        // this.OnNewCharacter();
        // if (version === 1) {
        //     if (this.communicator.canRead("havePages")) {
        //         this.havePages = this.getPages(this.communicator.read("havePages"));
        //     }
            // if (this.communicator.canRead("haveWarnings")) {
            //     this.haveWarnings = this.getWarnings(this.communicator.read("haveWarnings"));
            // }
        // }
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
        return "Phlossi";
    };

    this.getRequires = function () {
        return ["wanderer-core-save"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };


    this.getPhlossiTitle = function () {
        return ToteFlosfulgurPhlossi.title
        // return "test"
    };
    this.getPhlossiSubtitle = function () {
        return ToteFlosfulgurPhlossi.subtitle
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurPhlossi.component);
