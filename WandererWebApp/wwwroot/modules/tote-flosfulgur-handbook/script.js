let ToteFlosfulgurHandbook = {};

ToteFlosfulgurHandbook.component = function () {
    var that = this;

    this.getId = function () {
        return "tote-flosfulgur-handbook";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.logger = logger;
    };

    this.OnNewCharacter = function () {
        this.havePages = [];
        // this.haveWarnings = [];
        // this.fillInstructions();
        // this.fillWarnings();
    };

    this.OnSave = function () {
        this.communicator.write("havePages", this.getPageLabels(this.havePages));
    };

    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("havePages")) {
                this.havePages = this.getPages(this.communicator.read("havePages"));
            }
            // if (this.communicator.canRead("haveWarnings")) {
            //     this.haveWarnings = this.getWarnings(this.communicator.read("haveWarnings"));
            // }
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
        return "Flosfulgur Handbook";
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


    this.getManualTitle = function () {
        return ToteFlosfulgurManual.title
        // return "test"
    };
    this.getManualSubtitle = function () {
        return ToteFlosfulgurManual.subtitle
    };
    this.getManualAuthor = function () {
        return ToteFlosfulgurManual.author
    };
    this.getManualSubauthor = function () {
        return ToteFlosfulgurManual.subauthor
    };
    this.getManualIntroduction = function () {
        return ToteFlosfulgurManual.introduction
    };
    this.getManualKnow = function () {
        return ToteFlosfulgurManual.know
    };

    this.getNewPage = function() {
        var possible = this.getPossiblePages();
        shuffle(possible);
        var pick = possible[0];
        this.havePages.unshift(pick);
    }

    this.resetPages = function() {
        this.havePages = [];
    }

    this.getPageLabels = function(pages) {
        var labels = [];
        for (var page of pages) {
            labels.push(page.label);
        }
        return labels;
    }

    this.getPages = function(pageLabels) {
        var pages = [];
        for (var pageLabel of pageLabels) {
            for (var page of ToteFlosfulgurManual.pages)
                if (pageLabel == page.label) {
                    pages.push(page);
                    break;
                }
        }
        return pages;
    }
    //
    // this.getHaveLabels = function() {
    //     return this.getTepalsLabels(this.have);
    // }
    // this.getOptionsLabels = function() {
    //     return this.getTepalsLabels(this.options);
    // }
    this.getHavePages = function(pageLabels) {
        return this.havePages
        // return this.sortInstructions(instructions);
    }
    // this.sortTepals = function(tepals) {
    //     tepals.sort((a, b) => a.luminosity < b.luminosity);
    //     // tepals.sort((a, b) => a.genus < b.genus);
    //     return tepals.sort((a, b) => a.school < b.school);
    // }
    //
    //
    // this.getShowTepals = function() {
    //     var haveTepalsDict = {};
    //     for (var haveTepal of this.have) {
    //         if (!(haveTepal.corolla in haveTepalsDict)) {
    //             haveTepalsDict[haveTepal.corolla] = [haveTepal];
    //         }
    //         else {
    //             haveTepalsDict[haveTepal.corolla].push(haveTepal)
    //         }
    //     }
    //
    //     var showTepals = [];
    //     for (var corolla in haveTepalsDict) {
    //         showTepals.push(haveTepalsDict[corolla].sort((a, b) => a.luminosity < b.luminosity)[0])
    //     }
    //
    //     return this.sortTepals(showTepals);
    // }
    //
    this.getPossiblePages = function() {
        // return ToteFlosfulgurManual.pages;
        var pages = [];
        for (var page of ToteFlosfulgurManual.pages) {
            haveCount = 0;
            for (var havePage of this.havePages) {
                if (havePage.label == page.label) {
                    haveCount += 1
                }
            }

            if (page.maxHave > haveCount || page.maxHave == 0) {
                if (this.havePages.length >= page.reqHave || page.reqHave == 0) {
                    pages.push(page);
                }
            }
        }
        return pages
    };
    //
    // this.fillOptions = function () {
    //     var haveLabels = this.getHaveLabels();
    //     var maxOptions = 6;
    //     if (haveLabels.length == 0) {
    //         maxOptions = 10;
    //     }
    //     var maxOptionsUpgrade = 3;
    //     var possible = this.getPossibleTepals();
    //     shuffle(possible);
    //
    //     var options = [];
    //     for (var possibleTepal of possible) {
    //         if (options.length < maxOptionsUpgrade) {
    //             if (possibleTepal.prerequisites.length > 0) {
    //                 options.push(possibleTepal);
    //             }
    //         }
    //         else {
    //             break;
    //         }
    //     };
    //     for (var possibleTepal of possible) {
    //         if (options.length < maxOptions) {
    //             if (possibleTepal.prerequisites.length == 0) {
    //                 options.push(possibleTepal);
    //             }
    //         }
    //         else {
    //             break;
    //         }
    //
    //     }
    //     this.options = this.sortTepals(options);
    // };
    //
    // this.pick = function (tepal) {
    //     this.have.push(tepal);
    //     this.fillOptions();
    // };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ToteFlosfulgurHandbook.component);

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
