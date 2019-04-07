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
            ["Nature", []],
            ["Craft", []],
            ["Music", []],
            ["In the dark", []],
            ["Smell", []],
            ["Traps", []],
            ["People skills", []],
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
            ["Mechanic", ["Craft", "Intelligence"]],
            ["Setting Traps", ["Traps","Mechanic"]],
            ["Avoiding Traps", ["Traps","Reflexes"]],
            ["Cooking", ["Craft", "Smell"]],
            ["Patience", ["Mind"]],
            ["Architecture", ["Intelligence"]],
            ["Birdcalls", ["Nature"]],
            ["Dissertation", ["Intelligence","People skills"]],
            ["Mud Identification", ["Intelligence", "Nature"]],
            ["Botany", ["Intelligence", "Nature"]],
            ["Sketching", ["Craft"]],
            ["Journaling", ["Awareness", "Intelligence"]],
            ["Animal handling", ["People skills", "Nature"]]]);
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

        this.communicator.write("skills", toSave);
    };
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1) {
            if (this.communicator.canRead("skills")) {
                var loadedSkills = this.communicator.read("skills");

                for (var skill of loadedSkills) {

                    var targetSKill = null;
                    for (var existingSkill of this.skills) {
                        if (existingSkill.Name === skill.Name) {
                            targetSKill = existingSkill;
                        }
                    }

                    if (targetSKill !== null) {
                        targetSKill.DirectInFlow(skill.AssignedPoints);
                    } else {
                        console.error("could not match skill: " + skill.Name);
                    }
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
        return "Lomb Skills";
    };

    this.getSelectedPower = function () {
        var skillsToSum = [];
        for (var skill of this.skills) {
            if (skill.Active) {
                skillsToSum.push(skill);
            }
        }
        return Number(ColinLombSkills.SumSkills(ColinLombSkills.CollectSkills(skillsToSum,this.cache)) / 10.0).toFixed(1);
    };
    this.getTotalPower = function () {
        var res = 0;
        for (var skill of this.skills) {
            res += skill.OutFlowSum(this.cache);
        }
        return Number(res).toFixed(1);
    };
    this.reset = function () {
        this.cache = {};
        for (var skill of this.skills) {
            skill.Reset();
        }
    };
    this.cache = {};
    this.directInFlow = function (skill, movement) {
        this.cache = {};
        skill.DirectInFlow(movement);

    };
    this.outFlowSum = function (skill) {
        return skill.OutFlowSum(this.cache);
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
            } else {
                toRelateList.push(skills[relatedSkillName]);
            }
        }

        for (var toRelatedItem of toRelateList) {
            skills[skill2[0]].Related.push({
                weight: (toRelatedItem === toRelateList[0] ? 3.0 : 1.0) / (toRelateList.length + 2.0),
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

ColinLombSkills.CollectSkills = function (skillList,cache) {
    var res = [];
    for (var related of skillList) {
        var relatedOut = related.OutFlow(cache);
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
        OutFlowSum: function (cache) {
            return ColinLombSkills.SumSkills(this.OutFlow(cache)) / 10;
        },
        OutFlow: function (cache) {
            if (cache[name] !== undefined) {
                return cache[name];
            }

            var elements = [];
            for (var element of this.Related) {
                elements.push(element.element);
            }
            var res = ColinLombSkills.CollectSkills(elements, cache);
            cache[name] = res;
            return res;
        },
        Reset: function () {
            this.AssignedPoints = 0;
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
        ToolTip: function () {
            var names = [];
            for (var related of this.Related) {
                if (related.element.Name !== undefined) {
                    names.push(related.element.Name);
                }
            }
            var joined = names.join(", ");
            if (joined !== "") {
                joined = "(" + joined + ")";
            }
            return joined;
        },
        AssignedPoints: 0,
        Name: name,
        Related: []
    };
};