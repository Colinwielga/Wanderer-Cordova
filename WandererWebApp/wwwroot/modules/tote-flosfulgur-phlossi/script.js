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
        this.gmPublic = dependencies[1];
    };

    this.OnNewCharacter = function () {

		var fallbackEntity = g.SharedEntity.MakeTrackedEntity();

		fallbackEntity.SetString("currentPhlossiPoly","---");
		fallbackEntity.SetString("previousPhlossiPoly","---");
		fallbackEntity.SetString("playedPhlossiPoly", "---");
		fallbackEntity.SetString("challengePhlossiPoly", "---");
		fallbackEntity.SetString("currentChallengeColor", "");
		fallbackEntity.SetString("currentChallengeShape", "");

		this.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.previousPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.playedPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.challengePhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly("---");
		this.currentChallenge = ToteFlosfulgurGm.getChallenge("", "");

		var that = this;
        g.services.SignalRService.SubscribeToEntity(
            "B0AB3C37-C02A-4CF3-A2AB-E93948FAB9C3",
            "B7139F4D-D46C-45E7-80D8-A2A9A66AF539",
            fallbackEntity.entityChanges.GetEntityChanges(),
            function (key1, key2, payload) {
                g.services.timeoutService.$timeout(function () {
                    if (that.trackedEntity === undefined) {
						that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2, payload.RecentChanges[payload.RecentChanges.length - 1]);
                    } else {
						that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2, payload.RecentChanges[payload.RecentChanges.length - 1]);
                    }
					that.currentPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(that.trackedEntity.backing.currentPhlossiPoly.backing);
					that.previousPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(that.trackedEntity.backing.previousPhlossiPoly.backing);
					that.playedPhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(that.trackedEntity.backing.playedPhlossiPoly.backing);
					that.challengePhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(that.trackedEntity.backing.challengePhlossiPoly.backing);
					that.currentChallenge = ToteFlosfulgurGm.getChallenge(that.trackedEntity.backing.currentChallengeColor.backing, that.trackedEntity.backing.currentChallengeShape.backing);
                });
            });

        // this.havePages = [];
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
    };

    this.OnLoad = function () {
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
			setChallenge: function (challengeColor, challengeShape) {
				that.trackedEntity.SetString("currentChallengeColor", challengeColor);
				that.trackedEntity.SetString("currentChallengeShape", challengeShape);
				this.currentChallenge = ToteFlosfulgurGm.getChallenge(challengeColor, challengeShape);

				that.trackedEntity.SetString("challengePhlossiPoly", that.trackedEntity.backing.currentPhlossiPoly.backing);
				this.challengePhlossiPoly = new ToteFlosfulgurPhlossi.phlossiPoly(that.trackedEntity.backing.currentPhlossiPoly.backing);

				that.trackedEntity.entityChanges.Publish();
			},

			sendCard: function(fulgonId){

				var a = ToteFlosfulgurPhlossi.getPhlossiPoly(that.currentPhlossiPoly.fulgonId);
				var b = ToteFlosfulgurPhlossi.getPhlossiPoly(fulgonId);
				var c = ToteFlosfulgurPhlossi.getNextPhlossiPoly(a, b);
				that.previousPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(a.fulgonId);
				that.playedPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(b.fulgonId);
				that.currentPhlossiPoly = ToteFlosfulgurPhlossi.getPhlossiPoly(c.fulgonId);

				that.trackedEntity.SetString("previousPhlossiPoly", that.previousPhlossiPoly.fulgonId)
				that.trackedEntity.SetString("playedPhlossiPoly", that.playedPhlossiPoly.fulgonId)
				that.trackedEntity.SetString("currentPhlossiPoly", that.currentPhlossiPoly.fulgonId)
				that.trackedEntity.entityChanges.Publish();

			}
		};
	};

	this.reachPhlossiPoly = function(tag) {

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
    };
    this.getPhlossiSubtitle = function () {
        return ToteFlosfulgurPhlossi.subtitle
    };
	this.getCurrentPhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.currentPhlossiPoly.fulgonId);
	};
	this.getPreviousPhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.previousPhlossiPoly.fulgonId);
	};
	this.getPlayedPhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.playedPhlossiPoly.fulgonId);
	};
	this.getChallengePhlossiPoly = function () {
		return ToteFlosfulgurPhlossi.getPhlossiPoly(this.challengePhlossiPoly.fulgonId);
	};

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurPhlossi.component);
