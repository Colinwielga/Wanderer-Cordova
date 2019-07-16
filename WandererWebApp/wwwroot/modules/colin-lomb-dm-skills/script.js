let ColinLombDMSkills = {};

ColinLombDMSkills.DMSkill = function(name, weight) {
    return {
        name: name,
        weight: weight,
        isChecked: false
    };
}

ColinLombDMSkills.component = function () {
    this.getId = function () {
        return "colin-lomb-dm-skills";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.DMSkills =  [
            ColinLombDMSkills.DMSkill("Really Hard", 6),
            ColinLombDMSkills.DMSkill("Hard", 3),
            ColinLombDMSkills.DMSkill("Easy", -3),
            ColinLombDMSkills.DMSkill("Really Easy", -6),
            ColinLombDMSkills.DMSkill("Player is chashing in on pervious work", -3),
            ColinLombDMSkills.DMSkill("Players are working together", -3),
            ColinLombDMSkills.DMSkill("Player is doing something cool", -3)
        ];
    };
    this.OnNewCharacter = function () { };
    this.OnSave = function () { };
    this.OnLoad = function () { };
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
        return "Lomb DM Skills";
    };
    this.OnNewCharacter();

    
    this.SkillTotal = function () {

        var sum = 0;
        for (var skill of this.DMSkills) {
            if (skill.isChecked === true){
                sum  += skill.weight;
            }
        }

        return sum; 
    };
};

g.services.componetService.registerCharacter(ColinLombDMSkills.component);