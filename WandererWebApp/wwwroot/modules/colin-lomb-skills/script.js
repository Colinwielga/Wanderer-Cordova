var ColinLombSkills = {};

ColinLombSkills.component = function () {
    this.getId = function () {
        return "colin-lomb-skills";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.skills = ColinLombSkills.BuildSkills([
            ["Body", []],
            ["Mind", []],
            ["People skills", ["Mind"]],
            ["Strength", ["Body"]],
            ["Precision", ["Body"]],
            ["Balance", ["Body"]],
            ["Reflexes", ["Body"]],
            ["Awareness", ["Mind"]],
            ["Intelligence", ["Mind"]],
            ["Climb", ["Balance", "Strength"]],
            ["Swim", ["Strength"]],
            ["Jump", ["Strength"]],
            ["Combat", []],
            ["Dodge projectile", ["Reflexes", "Combat"]],
            ["Melee Block", ["Reflexes", "Strength", "Combat"]],
            ["Melee Attack", ["Strength", "Precision", "Combat"]],
            ["Bow", ["Strength", "Precision", "Combat"]],
            ["Shooting", ["Precision", "Combat"]],
            ["Throw", ["Strength", "Precision", "Combat"]],
            ["Wrestling", ["Strength", "Combat"]],
            ["Act", ["People skills"]],
            ["Intimidate", ["Act"]],
            ["Ingratiate", ["People skills"]],
            ["Track", ["Awareness"]],
            ["Hide", ["Awareness"]],
            ["Sneak", ["Balance", "Precision"]],
            ["Mechanic", ["Craft","Intelligence"]],
            ["Craft", ["Precision"]],
            ["Cooking", ["Craft", "Smell"]],
            ["Music", []],
            ["In the dark", []],
            ["Smell", []],
            ["Track using smell", ["Smell"]],
            ["Patience", ["Mind"]],
            ["Architecture", ["Intelligence"]],
            ["Birdcalls", []],
            ["Cigar rolling", ["Precision", "Craft"]],
            ["Botany", ["Intelligence"]],
            ["Sketching", ["Craft"]],
            ["Journaling", ["Awareness", "Intelligence"]],
            ["Animal handling", ["People skills"]]]);
    };
    this.OnNewCharacter = function () { };
    this.OnSave = function () {
        var toSave = [];
        for (var skill of this.skills) {
            toSave.push({
                Name: skill.Name,
                AssignedPoints: skill.AssignedPoints
            });
        }

        this.communicator.write("skills", this.toSave);
    };
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("skills")) {
                var loadedSkills = this.communicator.read("selectedDeck");
                for (var skill of loadedSkills) {
                    this.skills[skill.Name].DirectInFlow(skill.AssignedPoints);
                }
            }
        }
    };
    this.OnUpdate = function () { };
    this.getRequires = function () { return []; };
    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
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
        return "lomb skills";
    };

    this.getSelectedPower = function () {
        var skillsToSum = [];
        for (var skill of this.skills) {
            if (skill.Active) {
                skillsToSum.push(skill);
            }
        }
        return ColinLombSkills.SumSkills(ColinLombSkills.CollectSkills(skillsToSum))/10.0;
    };
    this.getTotalPower = function () {
        var res = 0;
        for (var skill of this.skills) {
            res += skill.OutFlowSum();
        }
        return res;
    };
    this.reset = function () {
        for (var skill of this.skills) {
            skill.Reset();
        }
    };
    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinLombSkills.component);

ColinLombSkills.BuildSkills = function (skillList) {
    var res = [];
    var skills = {};
    for (var skill of skillList) {
        var adding = ColinLombSkills.MakeSkill(skill[0]);
        res.push(adding);
        skills[skill[0]] = adding;
    }
    for (var skill2 of skillList) {
        var toRelateList = [ColinLombSkills.MakeInnerSkill(skill2[0])];
        for (var relatedSkillName of skill2[1]) {
            if (skills[relatedSkillName] === undefined) {
                console.error("could not find: " + relatedSkillName);
            }
            toRelateList.push(skills[relatedSkillName]);
        }

        for (var toRelatedItem of toRelateList) {
            skills[skill2[0]].Related.push({
                weight: (toRelatedItem === toRelateList[0] ? 2.0 : 1.0) / (toRelateList.length + 1.0),
                element: toRelatedItem
            });
        }
    }

    return res;
};

ColinLombSkills.MakeInnerSkill = function (name) {
    var weight = 0;
    return {
        OutFlow: function () {
            return [{
                name: name,
                weight: weight
            }];
        },
        Reset: function () {
            weight = 0;
        },
        InFlow: function (x) {
            weight += x;
        }
    };
};

ColinLombSkills.CollectSkills = function (skillList) {
    var res = [];
    for (var related of skillList) {
        var relatedOut = related.OutFlow();
        for (var relatedOutElement of relatedOut) {
            var already = false;
            for (var resElement of res) {
                already |= (resElement.name === relatedOutElement.name);
            }
            if (!already) {
                res.push(relatedOutElement);
            }
        }
    }
    return res;
};
ColinLombSkills.SumSkills = function (skillList) {
    var res = 0;
    for (var item of skillList) {
        res += item.weight;
    }
    return res;
};

ColinLombSkills.MakeSkill = function (name) {
    return {
        Active: false,
        OutFlowSum: function () {
            return ColinLombSkills.SumSkills(this.OutFlow())/10;
        },
        OutFlow: function () {
            var elements = [];
            for (var element of this.Related) {
                elements.push(element.element);
            }
            return ColinLombSkills.CollectSkills(elements);
        },
        Reset: function () {
            for (var related of this.Related) {
                related.element.Reset();
            }
        },
        DirectInFlow: function (x) {
            this.AssignedPoints += x;
            this.InFlow(x);
        },
        InFlow: function (x) {
            for (var related of this.Related) {
                related.element.InFlow(x * related.weight);
            }
        },
        AssignedPoints: 0,
        Name: name,
        Related: []
    };
}