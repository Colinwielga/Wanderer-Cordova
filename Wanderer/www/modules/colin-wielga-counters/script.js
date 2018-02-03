var component = function () {
    this.getId = function () {
        return "colin-wielga-counters"
    }
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
		this.coinState = "initialCoin";
    }
    this.OnNewCharacter = function () {
        this.facts = 3;
        this.coinState = "initialCoin";
    }
    this.OnSave = function () {
        this.communicator.write("facts", this.facts);
        this.communicator.write("coinState", this.coinState);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("facts")) {
            this.facts = this.communicator.read("facts");
        } else {
            this.facts = 3;
        }
        if (this.communicator.canRead("coinState")) {
            this.coinState = this.communicator.read("coinState");
        } else {
            this.coinState = "initialCoin";
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.canClose = function () {
        return true;
    }
    this.getTitle = function () {
        return "Counters";
    }
    this.getRequires = function () {
        return [];
    }
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }
    
    this.flipCoin = function () {
		
//		This could theoretically have fading animation but I couldn't get it working.
//		Someone can try to fix it later. --Nuch
		
//        $('#coin-cover').stop(true);             // Stop all queued animations for this element (allows rapid clicking).
//        $('#coin-cover').css({'opacity': 1});
		
		
        this.coinState = ["heads", "tails"][Math.floor(Math.random()*2)];

		
		// These variables update properly but I can't seem to make their properties pass on to the CSS.
		
//        $('#coin-cover').animate({'opacity': 0}, 400);
//		$('#coin-cover').css({'opacity': 0})

    }

    this.OnNewCharacter();
    
}

g.services.componetService.registerCharacter(component);
