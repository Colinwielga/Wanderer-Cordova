var ColinLombAlignment = {};

ColinLombAlignment.component = function () {

    // all component need a unique ID
    this.getId = function () {
        return "colin-lomb-alignment";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () {
        this.alignments = [{
            name: "Foolish",
            weight: 2,
            maxWeight: 3
        }, {
            name: "Curious",
            weight: 3,
            maxWeight: 4
        }];
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


    this.getAlignments = function (){
        return this.alignments;
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            getWeights: function () {

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
