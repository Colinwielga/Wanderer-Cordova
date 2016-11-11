var ColinWielgaSkillWeb = {};

ColinWielgaSkillWeb.makeNetwork = function () {
    return { skills: [], connections: [] };
}

ColinWielgaSkillWeb.MakeConnection = function (from, to) {
    return { to: to, from: from };
}

ColinWielgaSkillWeb.MakeSkill = function (name,specificity, rank) {
    return {name:name, specificity: specificity, rank: rank, active: false };
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
        if (this.communicator.canRead("tools")) {
            this.tools = this.communicator.read("tools");
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
            bonusProvided: that.bonusProvided
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
        return "Skills";
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
        this.network.skills.push(ColinWielgaSkillWeb.MakeSkill(newSkill, 1,1));
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
            return false;
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

    this.OnNewCharacter();
}

g.ComponetRegistry.register(ColinWielgaSkillWeb.component);