

ColinLombAlignment.component = function () {
    var that = this;

    // all component need a unique ID
    this.getId = function () {
        return "colin-lomb-alignment";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () {
        this.alignments = [];
        for (var alignment of ColinLombAlignment.alignments) {
            this.alignments.push({
                name: alignment.name,
                weight: 0,
                maxWeight: alignment.maxWeight,
                getCard: alignment.getCard
            });
        }
    };

    this.OnSave = function () {
        var toSave = [];
        for (var alignment of this.alignments) {
            toSave.push({
                name: alignment.name,
                weight: alignment.weight
            });
        }

        this.communicator.write("alignments", toSave);
    };
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("alignments")) {
                var loadedAlignments = this.communicator.read("alignments");

                for (var alignment of loadedAlignments) {

                    var targetAlignment = null;
                    for (var existingAlignment of this.alignments) {
                        if (existingAlignment.name === alignment.name) {
                            targetAlignment = existingAlignment;
                        }
                    }

                    if (targetAlignment !== null) {
                        targetAlignment.weight = alignment.weight;
                    } else {
                        console.error("could not match alignment: " + alignment.name);
                    }
                }
            }
        }
    };
    this.OnUpdate = function () {
    };
    this.getRequires = function () {
        return [];
    };
    this.getAlignments = function () {
        return this.alignments;
    };

    this.baseDeck = ColinLombAlignment.alignment("Base deck", [
        ""
    ], ColinLombAlignment.Standard);

    this.metaDeck = ColinLombAlignment.alignment("Meta deck", [
        "discard: fact"
    ], ColinLombAlignment.Low);

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            getCardContent: function () {
                if (Math.random() < .2) {
                    return that.metaDeck.getCard();
                }

                if (Math.random() < .5) {
                    var sum = 0;
                    for (var alignment of that.alignments) {
                        sum += alignment.weight;
                    }

                    var pull = Math.random() * sum;

                    for (var alignment2 of that.alignments) {
                        if (alignment2.weight !== 0) {
                            pull -= alignment2.weight;
                            if (pull <= 0) {
                                return alignment2.getCard();
                            }
                        }
                    }
                }

                return that.baseDeck.getCard();
            }
        };
    };
    this.canClose = function () {
        return true;
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Lomb Alignment";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinLombAlignment.component);
