var ColinWielgaSkillWeb = {};

ColinWielgaSkillWeb.makeNetwork = function () {
    return { skills: [], connections: [] };
}

ColinWielgaSkillWeb.SkillLevel = {
    SuperAbility: .25,
    Ability: .5,
    Skill: 1,
    SubSkill: 2
}

ColinWielgaSkillWeb.isSuperAbility = function (skill) {
    return skill.specificity == ColinWielgaSkillWeb.SkillLevel.SuperAbility;
}
ColinWielgaSkillWeb.isAbility = function (skill) {
    return skill.specificity == ColinWielgaSkillWeb.SkillLevel.Ability;
}
ColinWielgaSkillWeb.isSkill = function (skill) {
    return skill.specificity == ColinWielgaSkillWeb.SkillLevel.Skill;
}
ColinWielgaSkillWeb.isSubSkill = function (skill) {
    return skill.specificity == ColinWielgaSkillWeb.SkillLevel.SubSkill;
}

ColinWielgaSkillWeb.MakeConnection = function (from, to) {
    return { to: to, from: from };
}

ColinWielgaSkillWeb.MakeSkill = function (name,specificity, rank) {
    return {name:name, specificity: specificity, rank: rank, active: false , description:"" };
}

ColinWielgaSkillWeb.component = function () {
    var that = this;
    this.getId = function () {
        return "colin-wielga-skill-web"
    }
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator;
        this.network = ColinWielgaSkillWeb.makeNetwork()
        this.newSkill = "";
    }
    this.OnNewCharacter = function () {
        this.network = ColinWielgaSkillWeb.makeNetwork();
    }
    this.OnSave = function () {
        this.communicator.write("network", this.network);
    }
    this.OnLoad = function () {
        this.network = ColinWielgaSkillWeb.makeNetwork();
        if (this.communicator.canRead("network")) {
            this.network = this.communicator.read("network");
        }
    }
    this.OnUpdate = function () {
    }
    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            bonusProvided: that.bonusProvided,
            getSkillsJSON: that.getSkillsJSON
        }
    }

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        var totalBonus = 0;
        this.network.skills.forEach(function (skl) {
            totalBonus += skl.rank;
        })

        return "Skills (" + totalBonus + ")";
    }

    this.couldAdd = function (skillname) {
        var res = [];
        // get all the skills (except 'skill')
        this.network.skills.forEach(function (otherSkill) {
            if (otherSkill.name !== skillname) {
                res.push(otherSkill.name);
            }
        })
        // remove the ones we are already helping 
        this.network.connections.forEach(function (connection) {
            if (connection.from == skillname) {
                var at = res.indexOf(connection.to);
                res.splice(at, 1);
            }
        })
        return res;
    }

    this.subskills = function (skill) {
        var res = [];
        this.network.connections.forEach(function (connection) {
            if (connection.from == skill) {
                res.push(connection.to)
            }
        })
        return res;
    }

    this.connect = function (from,to) {
        this.network.connections.push(ColinWielgaSkillWeb.MakeConnection(from, to));
    }

    this.add = function (newSkill) {
        this.network.skills.push(ColinWielgaSkillWeb.MakeSkill(newSkill, 1, 1));
    }

    this.remove = function (skill) {
        var newSkills = [];
        this.network.skills.forEach(function (someSkill) {
            if (someSkill !== skill) {
                newSkills.push(someSkill)
            }
        })
        this.network.skills = newSkills;

        var newConnects = [];
        this.network.connections.forEach(function (someConnection) {
            if (someConnection.from !== skill.name && someConnection.to !== skill.name) {
                newConnects.push(someConnection)
            }
        })
        this.network.connections = newConnects;
    }

    var that = this;
    this.bonusProvided = function () {
        var total = 0;
        that.network.skills.forEach(function (skill) {
            if (skill.active) {
                total += that.skillBonus(skill);
            }
        });
        return total;
    }

    //returns a list of names
    this.getHelpers = function (skillname) {
        var res = [];

        this.network.connections.forEach(function (conn) {
            if (conn.to == skillname) {
                res.push(conn.from);
            }
        });

        return res;
    }

    this.couldBeHelpedBy = function (skillname) {
        var res = [];
        // get all the skills (except 'skill')
        this.network.skills.forEach(function (otherSkill) {
            if (otherSkill.name !== skillname) {
                res.push(otherSkill.name);
            }
        })
        // remove the ones we are that already help us 
        this.network.connections.forEach(function (conn) {
            if (conn.to == skillname) {
                var at =res.indexOf(conn.from);
                if (at > -1) {
                    res.splice(at, 1);
                }
            }
        })
        return res;
    }


    this.getSkillByName = function (skillname) {
        var res = null;
        this.network.skills.forEach(function (skill) {
            if (skillname == skill.name) {
                res= skill;
            }
        });

        if (res == null) {
            throw { message: "skill not found" };
        }

        return res;

    }
    
    this.setSuperAbility = function (skill) {
        skill.specificity = ColinWielgaSkillWeb.SkillLevel.SuperAbility;;
    }
    this.setAbility = function (skill) {
        skill.specificity = ColinWielgaSkillWeb.SkillLevel.Ability;;
    }
    this.setSkill = function (skill) {
        skill.specificity = ColinWielgaSkillWeb.SkillLevel.Skill;
    }
    this.setSubSkill = function (skill) {
        skill.specificity = ColinWielgaSkillWeb.SkillLevel.SubSkill;
    }
    this.isSuperAbility = function (skill) {
        return ColinWielgaSkillWeb.isSuperAbility(skill);
    }
    this.isAbility = function (skill) {
        return ColinWielgaSkillWeb.isAbility(skill);
    }
    this.isSkill = function (skill) {
        return ColinWielgaSkillWeb.isSkill(skill);
    }
    this.isSubSkill = function (skill) {
        return ColinWielgaSkillWeb.isSubSkill(skill);
    }

    this.skillBonus = function (skill) {
        var sum = skill.rank;
        var distance = 1;
        // list of nodes
        var blackList = [];
        // list of connections
        var current = this.getHelpers(skill.name);

        while (current.length != 0) {
            distance++;
            var nextCurrent = [];
            current.forEach(function (helper) {
                blackList.push(helper);
                sum += that.levelLoss(distance) * that.getSkillByName(helper).rank;
                that.getHelpers(helper).forEach(function (helpedByConnection) {
                    if (blackList.indexOf(helpedByConnection) == -1 && nextCurrent.indexOf(helpedByConnection) == -1) {
                        nextCurrent.push(helpedByConnection);
                    }
                });
            });
            current = nextCurrent;
        }
        return this.scaleLoss(sum)*skill.specificity;
    }

    this.skillBonusNormalized = function (skill) {
        var totalBonus = 0.0;
        var targetBonus = 0.0;
        that.network.skills.forEach(function (skl) {
            totalBonus += that.skillBonus(skl);
            targetBonus += skl.rank;
        });
        var notNormalized = this.skillBonus(skl);
        return (notNormalized * targetBonus) / (totalBonus);
    }

    this.levelLoss = function (distance) {
        return 1.0 / Math.pow(2.0, distance);
    }

    this.scaleLoss = function (sum) {
        return sum;
        //return (Math.pow(2 * Math.abs(sum) + 1, .5) - (Math.pow(3, .5) - 1)) * (sum==0?0:Math.abs(sum)/sum)/* Math.sign apparent not a thing */;
    }

    this.getText = function (skill) {
        return skill.active ? "relevant" : "-";
    }

    this.isNameOk = function (skillname) {
        if (skillname == "" || skillname == null || skillname == undefined) {
            return true;
        }

        var res = null;
        this.network.skills.forEach(function (skill) {
            if (skillname == skill.name) {
                res = skill;
            }
        });

        return res!=null;
    }

    this.unconnect = function (from,to) {
        var newConnects = [];
        this.network.connections.forEach(function (someConnection) {
            if (someConnection.from !== from || someConnection.to !== to) {
                newConnects.push(someConnection)
            }
        })
        this.network.connections = newConnects;
    }
    
    this.getSkillsJSON = function() {
        var json = {
            "nodes": [],
            "links": [],
        };
        that.network.skills.forEach(function (skill) {
            json["nodes"].push({"id": skill.name, "group": skill.specificity, "rank": skill.rank});
        });
        that.network.connections.forEach(function (connection) {
            json["links"].push({"source": connection.from, "target": connection.to});
        });
        return json;
        
//        return that.network.skills;
    }

    this.OnNewCharacter();
}

g.services.componetService.registerCharacter(ColinWielgaSkillWeb.component);
