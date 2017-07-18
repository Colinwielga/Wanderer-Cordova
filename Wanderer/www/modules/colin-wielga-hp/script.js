// TODO all this max and mins should be in getters + setters 

var component = function () {
    this.MaxHP = 8;
    this.MaxEncounterHP = 4;

    this.getId = function () {
        return "colin-wielga-hp"
    }
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
		
    }
    this.OnNewCharacter = function () {
        this.hp = this.MaxHP;
        this.encounterHP = this.MaxEncounterHP;
    }
    this.OnSave = function () {
        this.communicator.write("hp", this.hp);
        this.communicator.write("encounterHP", this.encounterHP);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("hp")) {
            this.hp = this.communicator.read("hp");
        } else {
            this.hp = this.MaxHP;
        }
        if (this.communicator.canRead("encounterHP")) {
            this.encounterHP = this.communicator.read("encounterHP");
        } else {
            this.encounterHP = this.MaxEncounterHP;
        }
    }
    this.ColorString = function () {
        var r = Math.floor(((this.hp + this.encounterHP) / 12.0)*255);
        var g = 255 - r;
        return "#" + g.toString(16) + r.toString(16) +"00";
    }
    this.HPString = function () {
        return (Math.max(0,((this.hp + this.encounterHP) / 12.0) * 100)) + "%";
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
        return "HP";
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
        this.encounterHP = Math.Max(0,Math.floor(this.encounterHP * 10) / 10);
        this.hp = Math.Max(0,Math.floor(this.hp * 10) / 10);
    }

    this.heal = function () {
        this.hp += hpMover();
        this.encounterHP = Math.min(Math.floor(this.encounterHP * 10) / 10, this.MaxEncounterHP);
        this.hp = Math.min(Math.floor(this.hp * 10) / 10, this.MaxHP);
    }

    this.recoverEncounterHP = function () {
        this.encounterHP = this.MaxEncounterHP;
    }

    this.OnNewCharacter();
    
}

g.services.componetService.registerCharacter(component);
