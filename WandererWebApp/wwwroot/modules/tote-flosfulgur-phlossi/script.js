ToteFlosfulgurPhlossi.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-phlossi";
    };

    this.getSystem = function () {
        return "Flosfulgur"
    };

	this.key = Math.random() + "";
    this.joined = false;
    this.displayableMakers = [];
    this.displayables = [];
	this.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("--");
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.page = page;
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

    this.ShouldHandleMessage = function(message){
        return message.module === that.getId();
    };

    this.OnMessageCallBack = function(message){
        g.services.timeoutService.$timeout(function() {

            // var objDiv = document.getElementById("phlossi-surface");
            // var wasAtBottom = (objDiv.scrollTop + objDiv.offsetHeight) === objDiv.scrollHeight;

            for (let displayableMaker of that.displayableMakers) {
                if (displayableMaker.CanDisplay(message)){
                    var displayable = displayableMaker.ConvertToDisplayable(message);
                    that.displayables.push(displayable);

					if (displayable != undefined) {
						that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(displayable.getModel().polyID)
					}

					// if (displayable === undefined) {
					// 	that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("--")
					// }
					// else {
					// 	that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(displayable.getModel().polyID)
					// }

                    // scoll to bottom
                    // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div


                    g.services.timeoutService.$timeout(function() {
                        // if (wasAtBottom){
                        //     objDiv.scrollTop = objDiv.scrollHeight;
                        // }
                    });

                    return;
                }
            }

        });
    };

    this.OnNewCharacter = function () {
		this.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("--");
        // this.havePages = [];
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
        this.communicator.write("currentPhlossiPoly", this.currentPhlossiPoly);
    };

    this.OnLoad = function () {
        // var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        // if (version === 1) {
            if (this.communicator.canRead("currentPhlossiPoly")) {
				// console.log("loading!");
				// console.log(this.communicator.read("currentPhlossiPoly"));
                this.currentPhlossiPoly = this.communicator.read("currentPhlossiPoly");
            }
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
		var that = this;
		return {
			getVersion: function () {
				return 1;
			},
			// PublicSendMessage: function (message) {
			// 	g.services.SignalRService.Send(that.key, {
			// 		text: message,
			// 		timestamp: Date.now(),
			// 		sender: that.page.name,
			// 		module: that.getId(),
			// 		displayerModule : that.getId()
			// 	});
			// },
			sendCard: function(message){
				message.module = that.getId();
				g.services.SignalRService.Send(that.key, message);
			},
			addDisplayableMaker: function(displayableMaker){
				that.displayableMakers.push(displayableMaker);
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
	this.getCurrentPhlossiPoly = function () {
		// console.log(this.currentPhlossiPoly);
		return new ToteFlosfulgurPhlossi.phlossiPoly(this.currentPhlossiPoly.fulgonId);
		// var lastCard = this.displayables[this.displayables.length - 1]
		// // console.log(this.displayables)
		// if (lastCard === undefined) {
		// 	// console.log("empty card")
		// 	return new ToteFlosfulgurPhlossi.phlossiPoly("--")
		// }
		// else {
		// 	// console.log(lastCard)
		// 	var lastCardModel = lastCard.getModel()
		// 	// console.log(lastCardModel.polyPoints)
		// 	return new ToteFlosfulgurPhlossi.phlossiPoly(lastCardModel.polyID)
		// }
	}

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurPhlossi.component);
