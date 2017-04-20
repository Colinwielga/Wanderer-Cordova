var component = function () {
    this.getId = function () {
        return "colin-wielga-counters"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.hp = 8;
        this.encounterHP = 4;
        this.facts = 3;
        this.coinState = "H";
    }
    this.OnSave = function () {
        this.communicator.write("hp", this.hp);
        this.communicator.write("encounterHP", this.encounterHP);
        this.communicator.write("facts", this.facts);
        this.communicator.write("coinState", this.coinState);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("hp")) {
            this.hp = this.communicator.read("hp");
        } else {
            this.hp = 8;
        }
        if (this.communicator.canRead("encounterHP")) {
            this.encounterHP = this.communicator.read("encounterHP");
        } else {
            this.encounterHP = 4;
        }
        if (this.communicator.canRead("facts")) {
            this.facts = this.communicator.read("facts");
        } else {
            this.facts = 3;
        }
        if (this.communicator.canRead("coinState")) {
            this.coinState = this.communicator.read("coinState");
        } else {
            this.coinState = "H";
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

    var hpMover = function () {
        return 1 + Math.min(Math.max(-.9, Roll.roll(1)), 1);
    }

    this.hit = function () {
        var dif = hpMover();
        if (this.encounterHP > dif) {
            this.encounterHP -= dif;
        } else {
            dif -= this.encounterHP;
            this.encounterHP = 0;
            this.hp -= dif;
        }
        this.encounterHP = Math.floor(this.encounterHP * 10) / 10;
        this.hp = Math.floor(this.hp * 10) / 10;
    }

    this.heal = function () {
        this.hp += hpMover();
        this.encounterHP = Math.floor(this.encounterHP * 10) / 10;
        this.hp = Math.floor(this.hp * 10) / 10;
    }

    this.recoverEncounterHP = function () {
        this.encounterHP = 4;
    }
    
    this.flipCoin = function () {
        $('#coin-text').stop(true);             // Stop all queued animations for this element (allows rapid clicking).
        $('#coin-text').css({'opacity': 0});
        this.coinState = ["H", "T"][Math.floor(Math.random()*2)];
        $('#coin-text').animate({'opacity': 0}, 200);
        $('#coin-text').animate({'opacity': 1}, 400);
    }

    this.OnNewCharacter();
    
}

g.services.componetService.registerCharacter(component);
