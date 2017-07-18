var component = function () {
    this.getId = function () {
        return "colin-wielga-counters"
    }
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
		console.log(this.coinState);
		
    }
    this.OnNewCharacter = function () {
        this.facts = 3;
        this.coinState = "heads";
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
            this.coinState = "heads";
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
		
		
        $('#coin-cover').stop(true);             // Stop all queued animations for this element (allows rapid clicking).
        $('#coin-cover').css({'opacity': 1});
		
		
        this.coinState = ["heads", "tails"][Math.floor(Math.random()*2)];
		console.log(document.getElementById('coin').className); // Check to see if the class name updated.
		
		// These variables update properly but I can't seem to make their properties pass on to the CSS.
		this.coinImg = (this.coinState=="heads" ? "macron-wb-c-120.png" : "macron-bw-c-120.png");
		this.coinUrl = 'url("'+this.coinImg+'")';
		
        $('#coin-cover').animate({'opacity': 0}, 400);
		console.log(this.coinState); // This may show the wrong result in the console, not sure why. Just delayed.
		console.log(this.coinImg);
		console.log(this.coinUrl);
    }

    this.OnNewCharacter();
    
}

g.services.componetService.registerCharacter(component);
