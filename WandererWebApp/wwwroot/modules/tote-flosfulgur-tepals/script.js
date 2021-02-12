let ToteFlosfulgurTepals = {};

ToteFlosfulgurTepals.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-tepals";
    };

    this.getSystem = function () {
        return "Flosfulgur"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.logger = logger;
    };

    this.OnNewCharacter = function () {
        this.have = [];
        this.options = [];
        this.fillOptions()
    };

    this.OnSave = function () {
        this.communicator.write("have", this.getHaveLabels());
        this.communicator.write("options", this.getOptionsLabels());
    };

    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("have")) {
                this.have = this.getTepals(this.communicator.read("have"));
            }
            if (this.communicator.canRead("options")) {
                this.options = this.getTepals(this.communicator.read("options"));
            }
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
        return "Flosfulgur Tepals";
    };

    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };

    this.resetHave = function() {
        this.have = [];
        this.fillOptions();
    }
    this.getTepalsLabels = function(tepals) {
        var labels = [];
        for (var tepal of tepals) {
            labels.push(tepal.label);
        }
        return labels;
    }

    this.getHaveLabels = function() {
        return this.getTepalsLabels(this.have);
    }
    this.getOptionsLabels = function() {
        return this.getTepalsLabels(this.options);
    }
    this.getTepals = function(tepalLabels) {
        var tepals = [];
        for (var tepal of ToteFlosfulgurTepal.tepals) {
            if (tepalLabels.includes(tepal.label)) {
                tepals.push(tepal);
            }
        }
        return this.sortTepals(tepals);
    }
    this.sortTepals = function(tepals) {
        return tepals.sort((a, b) => (parseInt(a.luminosity) > parseInt(b.luminosity)) ? -1 : 1);
        // tepals.sort((a, b) => a.genus < b.genus);
        // return tepals.sort((a, b) => (a.school > b.school) ? 1 : -1);
    }


    this.getShowTepals = function() {
        var haveTepalsDict = {};
        for (var haveTepal of this.have) {
            if (!(haveTepal.corolla in haveTepalsDict)) {
                haveTepalsDict[haveTepal.corolla] = [haveTepal];
            }
            else {
                haveTepalsDict[haveTepal.corolla].push(haveTepal)
            }
        }

        var showTepals = [];
        for (var corolla in haveTepalsDict) {
            showTepals.push(haveTepalsDict[corolla].sort((a, b) => (parseInt(a.luminosity) < parseInt(b.luminosity)) ? 1 : -1)[0])
        }
        return this.sortTepals(showTepals);
    }

    this.getPossibleTepals = function() {
        var possible = []
        var haveLabels = this.getHaveLabels();
        for (var availableTepal of ToteFlosfulgurTepal.tepals) {
            if (haveLabels.includes(availableTepal.label)) {
                continue;
            }
            if (availableTepal.prerequisites.length == 0) {
                possible.push(availableTepal);
            }
            else {
                for (var prereqArray of availableTepal.prerequisites) {
                    if (prereqArray.every(val => haveLabels.includes(val))) {
                        possible.push(availableTepal);
                        break;
                    }
                };
            }
        };
        return possible;
    };

    this.fillOptions = function () {
        var haveLabels = this.getHaveLabels();
        var maxOptions = 6;
        if (haveLabels.length == 0) {
            maxOptions = 10;
        }
        var maxOptionsUpgrade = 3;
        var possible = this.getPossibleTepals();
        shuffle(possible);

        var options = [];
        for (var possibleTepal of possible) {
            if (options.length < maxOptionsUpgrade) {
                if (possibleTepal.prerequisites.length > 0) {
                    options.push(possibleTepal);
                }
            }
            else {
                break;
            }
        };
        for (var possibleTepal of possible) {
            if (options.length < maxOptions) {
                if (possibleTepal.prerequisites.length == 0) {
                    options.push(possibleTepal);
                }
            }
            else {
                break;
            }

        }
        this.options = this.sortTepals(options);
    };

    this.pick = function (tepal) {
        this.have.push(tepal);
        this.fillOptions();
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurTepals.component);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
