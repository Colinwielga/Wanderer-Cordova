// TODO all this max and mins should be in getters + setters 

var component = function () {
    this.MaxHP = 8.0;
    this.MaxEncounterHP = 4.0;

    this.MoveEncounterHP = function (num) {
        var start = this.encounterHP;
        this.encounterHP = Math.min(Math.max(this.encounterHP + num, 0), this.MaxEncounterHP);
        return num - (this.encounterHP - start);
    };

    this.MoveHP = function (num) {
        var start = this.hp;
        this.hp = Math.min(Math.max(this.hp + num, 0), this.MaxHP);
        return num - (this.hp - start);
    };

    this.getId = function () {
        return "colin-wielga-hp";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;

    };
    this.OnNewCharacter = function () {
        this.hp = this.MaxHP;
        this.encounterHP = this.MaxEncounterHP;
    };
    this.OnSave = function () {
        this.communicator.write("hp", this.hp);
        this.communicator.write("encounterHP", this.encounterHP);
    };
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
    };
    this.ColorString = function () {
        var r = Math.floor((this.hp + this.encounterHP) / (this.MaxHP + this.MaxEncounterHP) * (0xCC - 0x33));
        var g = (0xCC - 0x33) - r;
        var rstring = (0x33 + r).toString(16);
        rstring = rstring.length === 1 ? "0" + rstring.length : rstring;
        var gstring = (0x33 + g).toString(16);
        gstring = gstring.length === 1 ? "0" + gstring.length : gstring;
        return "#" + gstring + rstring + "33";
    };
    this.HPString = function () {
        return Math.max(0, (this.hp + this.encounterHP) / 12.0 * 100) + "%";
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
        return "HP";
    };
    this.getRequires = function () {
        return [];
    };
    this.Alive = function () {
        return this.hp + this.encounterHP > 0;
    };
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    var hpMover = function () {
        return 1 + Math.min(Math.max(-.75, Roll.roll(1) / 2.0), .75);
    };

    this.hit = function () {
        var x = this.MoveEncounterHP(-hpMover());
        this.MoveHP(x);
    };

    this.FullHeal = function () {
        var x = this.MoveEncounterHP(1000);
        this.MoveHP(x);
    };

    this.recoverEncounterHP = function () {
        this.MoveEncounterHP(1000);
        this.MoveHP(hpMover() / 2.0);
    };

    this.OnNewCharacter();

};

g.services.componetService.registerCharacter(component);
