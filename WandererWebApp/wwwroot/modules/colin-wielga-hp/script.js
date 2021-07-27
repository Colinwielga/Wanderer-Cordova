// TODO all this max and mins should be in getters + setters 

var colinWielgaHp = {};

colinWielgaHp.component = function () {
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

    this.getSystem = function () {
        return "Core"
    };

    this.getId = function () {
        return "colin-wielga-hp";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.ledgerPublic = dependencies[0];
    };
    this.OnNewCharacter = function () {
        this.hp = this.MaxHP;
        this.encounterHP = this.MaxEncounterHP;    
        this.status = this.getStatus();
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
        this.status = this.getStatus();
    };
    this.ColorString = function () {
        var r = Math.floor((this.hp + this.encounterHP) / (this.MaxHP + this.MaxEncounterHP) * (0xCC - 0x33));
        var g = 0xCC - 0x33 - r;
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
        return ["wanderer-core-ledger"];
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
        this.status = this.getStatus();
        this.ledgerPublic.AutoMessage("took a hit! status: " + this.status);  
    };

    this.FullHeal = function () {
        var x = this.MoveEncounterHP(1000);
        this.MoveHP(x);
        this.status = this.getStatus();
        this.ledgerPublic.AutoMessage("fully restored their health! status: " + this.status);
    };

    this.recoverEncounterHP = function () {
        this.MoveEncounterHP(1000);
        this.MoveHP(hpMover() / 2.0);
        this.status = this.getStatus();
        this.ledgerPublic.AutoMessage("Survived the encounter. status: " + this.status);
    };

    this.getStatus = function () {
        var totalHP = this.encounterHP + this.hp;
        if (totalHP === 12){
            return this.randomFromList(["chipper","spritely","vivacious"]);
        }
        if (totalHP < 12 && totalHP >= 11){
            return this.randomFromList(["winded","shaken","stunned"]); 
        }
        if (totalHP < 11 && totalHP >= 10){
            return this.randomFromList(["scratched","shaken", "stunned"]); 
        }
        if (totalHP < 10 && totalHP >= 9){
            return this.randomFromList(["scratched","bruised"]);
        }
        if (totalHP < 9 && totalHP >= 8){
            return this.randomFromList(["bruised","exhausted"]);
        }
        if (totalHP < 8 && totalHP >= 7){
            return this.randomFromList(["bloodied","exhausted","bleeding"]);
        }
        if (totalHP < 7 && totalHP >= 6){
            return this.randomFromList(["bloodied","bleeding", "wounded","battered"]);
        }
        if (totalHP < 6 && totalHP >= 5){
            return this.randomFromList(["wounded","broken","limping","battered"]);
        }
        if (totalHP < 5 && totalHP >= 4){
            return this.randomFromList(["limping","broken","battered","bleeding profusely"]);
        }
        if (totalHP < 4 && totalHP >= 3){
            return this.randomFromList(["bleeding profusely","broken","covered in blood"]);   
        }   
        if (totalHP < 3 && totalHP >= 2){
            return this.randomFromList(["covered in blood","staggering"]);   
        }   
        if (totalHP < 2 && totalHP >= 1){
            return this.randomFromList(["badly hurt","staggering"]);   
        }   
        if (totalHP < 1 && totalHP > 0){
            return this.randomFromList(["barely conscious"]);
        }
        if (totalHP <= 0){
            return this.randomFromList(["unconscious"]);
        }
    };
    
    this.randomFromList = function (list) {
        return list[Math.floor(Math.random() * list.length)];
    };


    this.OnNewCharacter();

};

g.services.componetService.registerCharacter(colinWielgaHp.component);
