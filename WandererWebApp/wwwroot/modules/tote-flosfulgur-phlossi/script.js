ToteFlosfulgurPhlossi.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-phlossi";
    };

    this.getSystem = function () {
        return "Flosfulgur"
    };

    this.getRequires = function () {
		return ["wanderer-core-save", "tote-flosfulgur-gm"];
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.page = page;
        dependencies[0].onJoin(this.OnJoinCallBack);
		this.gmPublic = dependencies[1];
    };

	this.key = Math.random() + "";
	// this.key = "tote-test";
    this.joined = false;
	this.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
	this.previousPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
	this.playedPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
	this.challengePhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
	that.currentChallengeId = 0;
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
        return message.module === that.getId() || message.module === that.gmPublic.getId();
    };

    this.OnMessageCallBack = function(message){
		// console.log("callback");
        g.services.timeoutService.$timeout(function() {
			// console.log(message.module);
			if (message.module === that.getId()) {
				that.previousPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(message.previous);
				that.playedPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(message.played);
				that.currentPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(message.current);
				// console.log(that.currentPhlossiPoly);
			}
			else if (message.module === that.gmPublic.getId()) {
				that.currentChallengeId = message.challengeId;
				that.challengePhlossiPoly = that.currentPhlossiPoly;
				console.log("set challenge", that.gmPublic.getChallenge(that.currentChallengeId).id);
			}

            // var objDiv = document.getElementById("phlossi-surface");
            // var wasAtBottom = (objDiv.scrollTop + objDiv.offsetHeight) === objDiv.scrollHeight;

            // for (let displayableMaker of that.displayableMakers) {
            //     if (displayableMaker.CanDisplay(message)){
            //         var displayable = displayableMaker.ConvertToDisplayable(message);
            //         that.displayables.push(displayable);
			//
			// 		if (displayable != undefined) {
			// 			that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(displayable.getModel().polyID)
			// 		}
			//
			// 		// if (displayable === undefined) {
			// 		// 	that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("--")
			// 		// }
			// 		// else {
			// 		// 	that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(displayable.getModel().polyID)
			// 		// }
			//
            //         // scoll to bottom
            //         // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
			//
			//
            //         g.services.timeoutService.$timeout(function() {
            //             // if (wasAtBottom){
            //             //     objDiv.scrollTop = objDiv.scrollHeight;
            //             // }
            //         });

            //         return;
            //     }
            // }

        });
    };

    this.OnNewCharacter = function () {
		this.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.previousPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.playedPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
        // this.havePages = [];
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
        this.communicator.write("currentPhlossiPoly", this.currentPhlossiPoly);
        this.communicator.write("previousPhlossiPoly", this.previousPhlossiPoly);
        this.communicator.write("playedPhlossiPoly", this.playedPhlossiPoly);
        this.communicator.write("currentChallengeId", this.currentChallengeId);
    };

    this.OnLoad = function () {
        this.OnNewCharacter();
        if (this.communicator.canRead("currentPhlossiPoly")) {
            this.currentPhlossiPoly = this.communicator.read("currentPhlossiPoly");
        }
        if (this.communicator.canRead("previousPhlossiPoly")) {
            this.previousPhlossiPoly = this.communicator.read("previousPhlossiPoly");
        }
        if (this.communicator.canRead("playedPhlossiPoly")) {
            this.playedPhlossiPoly = this.communicator.read("playedPhlossiPoly");
        }
        if (this.communicator.canRead("currentChallengeId")) {
            this.currentChallengeId = this.communicator.read("currentChallengeId");
        }
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
			sendCard: function(fulgonId){
				// that.previousPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(that.currentPhlossiPoly.fulgonId);
				// that.playedPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(fulgonId)
				// that.currentPhlossiPoly = ToteFlosfulgurPhlossi.getNextPhlossiPoly(
				// 	that.previousPhlossiPoly,
				// 	that.playedPhlossiPoly
				// )
				var a = ToteFlosfulgurPhlossi.getPhlossiPoly(that.currentPhlossiPoly.fulgonId);
				var b = ToteFlosfulgurPhlossi.getPhlossiPoly(fulgonId);
				var c = ToteFlosfulgurPhlossi.getNextPhlossiPoly(a, b);
				that.previousPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(a.fulgonId);
				that.playedPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(b.fulgonId);
				that.currentPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(c.fulgonId);
				// console.log(a);
				// console.log(b);
				// console.log(c);

				// console.log(that.previousPhlossiPoly);
				// console.log(that.currentPhlossiPoly);
				// message.module = that.getId();
				g.services.SignalRService.Send(that.key, {
					module: that.getId(),
					previous: a.fulgonId,
					played: b.fulgonId,
					current: c.fulgonId
				});
			}
		};
	};

	this.reachPhlossiPoly = function(tag) {
		// console.log("here", tag);
		switch (tag) {
			case "previous":
				return this.previousPhlossiPoly;
			case "played":
				return this.playedPhlossiPoly;
			case "current":
				return this.currentPhlossiPoly;
			case "challenge":
				return this.challengePhlossiPoly;
		}
	}


    this.getPhlossiTitle = function () {
        return ToteFlosfulgurPhlossi.title
        // return "test"
    };
    this.getPhlossiSubtitle = function () {
        return ToteFlosfulgurPhlossi.subtitle
    };
	this.getCurrentPhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.currentPhlossiPoly.fulgonId);
	};
	this.getPreviousPhlossiPoly = function () {
		// console.log("x");
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.previousPhlossiPoly.fulgonId);
	};
	this.getPlayedPhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.playedPhlossiPoly.fulgonId);
	};
	this.getChallengePhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.challengePhlossiPoly.fulgonId);
	};
	this.getCurrentChallenge = function () {
		return that.gmPublic.getChallenge(that.currentChallengeId);
	};

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurPhlossi.component);
