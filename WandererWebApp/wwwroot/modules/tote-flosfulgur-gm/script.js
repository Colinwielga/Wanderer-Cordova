ToteFlosfulgurGm.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-gm";
    };

    this.getSystem = function () {
        return "Flosfulgur"
    };

    this.getRequires = function () {
        //return ["wanderer-core-save"];
         return ["wanderer-core-save", "tote-flosfulgur-phlossi"];
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        // this.communicator = communicator;
        this.logger = logger;
        this.phlossiPublic = dependencies[1];
    };

	// this.key = Math.random() + "";
    // this.joined = false;
	// this.currentChallenge = ToteFlosfulgurGm.getChallenge(0);
    // this.OnStart = function (communicator, logger, page, dependencies) {
    //     this.communicator = communicator;
    //     this.page = page;
    //     //dependencies[0].onJoin(this.OnJoinCallBack);
    // };
    // this.OnJoinCallBack = function(groupName){
    //     g.services.SignalRService.tryRemoveCallback(that.key);
    //     g.services.SignalRService.setCallback(
    //         that.key,
    //         groupName,
    //         that.ShouldHandleMessage,
    //         that.OnMessageCallBack
	// 	);
    //     g.services.timeoutService.$timeout(function () {
    //         that.joined = true;
    //     })
    // };

    // this.ShouldHandleMessage = function(message){
    //     return message.module === that.getId();
    // };

    // this.OnMessageCallBack = function(message){
	// 	// console.log("callback");
    //     g.services.timeoutService.$timeout(function() {
	// 		that.currentChallenge = ToteFlosfulgurGm.getChallenge(message.challengeId);
    //     });
    // };

    this.OnNewCharacter = function () {
		// this.currentChallenge = ToteFlosfulgurGm.getChallenge(0);
    };

    this.reset = function () {
        this.OnNewCharacter();
    };

    this.OnSave = function () {
        // this.communicator.write("challengeId", this.currentChallenge.id);
    };

    this.OnLoad = function () {
        // if (this.communicator.canRead("challengeId")) {
        //     this.currentChallenge = ToteFlosfulgurGm.getChallenge(this.communicator.read("challengeId"));
        // } else {
        //     this.currentChallenge = ToteFlosfulgurGm.getChallenge(0);
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
        return "Flosfulgur GM";
    };

	this.currentChallenge = ToteFlosfulgurGm.getChallenge("", "");


	this.setChallenge = function(color, shape){
        this.phlossiPublic.setChallenge(color, shape);
		this.currentChallenge = ToteFlosfulgurGm.getChallenge(color, shape);
		// console.log(challengeId);
		// that.currentChallenge = ToteFlosfulgurGm.getChallenge(challengeId);
		// g.services.SignalRService.Send(that.key, {
		// 	module: that.getId(),
		// 	challengeId: challengeId
		// });
	};
	this.optionsColor = ToteFlosfulgurGm.challengeChoicesColor;
	this.optionsShape = ToteFlosfulgurGm.challengeChoicesShape;


    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            getId: function () {
                return that.getId();
            },
			// getChallenge: function (challengeId) {
			// 	return ToteFlosfulgurGm.getChallenge(challengeId);
			// }
        };
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurGm.component);
