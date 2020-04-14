    var component = function () {

	// Setting some default values for dice.
	
	this.lo = 1;
	this.hi = 6;
	this.ndrolls = 1;
	this.drolls = [];
	this.drollstext = "";
    this.drollsum = 0;
    
    this.advancedDisplayed = false;

    this.showAdvanced = function () {
        if (this.advancedDisplayed === false){
            this.advancedDisplayed = true;
        }
        else {
            this.advancedDisplayed = false;
        }
    }
	
    this.getSystem = function () {
        return "Core"
    }

    this.getId = function () {
        return "manuchehr-aminian-dice";
    }
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.page = page;
        this.communicator = communicator;
    }
    this.OnNewCharacter = function () { }
    this.OnSave = function () { }
    this.OnLoad = function () { }
    this.canClose = function () {
        return true;
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    }
    this.getTitle = function () {
        return "Dice";
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
	
	
	// Do a single dice roll with the given range of numbers.
    this.intRand = function () {
        mo = Math.random();
        result = this.lo + Math.floor((this.hi - this.lo + 1) * mo);
        return result;
    }
	
	// Do repeated dice rolls with the given range of numbers.
    this.diceRoll = function () {

        this.drolls = [];
        this.ndrolls = Number(document.getElementById("ndicerolls").value);
        this.hi = Number(document.getElementById("dicerangehi").value);

        this.drollsum = 0;
        for (i = 0; i < this.ndrolls; i++) {
            mo = this.intRand();
            this.drolls.push(mo);
            this.drollsum += mo;
        }

        this.drollstext = this.drolls.join(", ");

        return 0;
    }

    this.OnNewCharacter();
}


g.services.componetService.registerCharacter(component);
