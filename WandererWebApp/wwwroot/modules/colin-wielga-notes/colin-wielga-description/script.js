﻿

var component = function () {
    this.getId = function () {
        return "colin-wielga-description";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
    };
    this.OnNewCharacter = function () {
        this.description = "";
    };
    this.OnSave = function () {
        this.communicator.write("description", this.description);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("description")) {
            this.description = this.communicator.read("description");
        } else {
            this.description = "";
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
        return "Description";
    };
    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            },
            getCharacterDescription: function () {
                return that.description;
            }
        };
    };
    this.OnNewCharacter();
};
g.services.componetService.registerCharacter(component);