// TODO get better typing for angular https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angularjs/angular.d.ts
//declare var angular: any;

var g = {};

var App = angular.module("wandererApp", []);

App.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('images/');
    }]);

var component = function () {
    this.getId = function () {
        return "wanderer-core-modules"
    }

    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    }
    this.OnNewCharacter = function () {}
    this.OnSave = function () {
        this.communicator.write("activeComponents", this.activeComponents);
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("activeComponents")) {
            this.activeComponents = this.communicator.read("activeComponents");
        } else {
            this.activeComponents = [this];
        }
    }
    this.OnUpdate = function () { }
    this.getRequires = function () {
        return [];
    }
    this.getPublic = function () {
        var that = this;
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            },
            register: function (componentFactory) {
                var newComp = new componentFactory();
                for (var i = 0; i < that.components.length; i++) {
                    if (that.components[i].getId() == newComp.getId()) {
                        throw { mesage: "two components with the same id" }
                    }
                }
                that.components.push(newComp);
            },
            //maybe this should be a dictonary
            getComponent: function (lookingFor) {
                for (var i = 0; i < that.components.length; i++) {
                    var inner = that.components[i];
                    if (lookingFor === inner.getId()) {
                        return inner.getPublic();
                    }
                }
                throw { message: "could not find id: " + lookingFor };
            },
            activeComponents:
                function () {
                    return that.activeComponents;
                },
            components: that.components
        }
    }
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "modules";
    }
    this.toggle = function (mod) {
        if (mod != this) {
            var i = this.activeComponents.indexOf(mod.getId());
            if (i == -1) {
                this.activeComponents.push(mod.getId());
            } else {
                this.activeComponents.splice(i, 1);
            }
        }
    }

    this.text = function (mod) {
        var i = this.activeComponents.indexOf(mod.getId());
            if (i == -1) {
                return "show";
            } else {
                return "hide";
            }
    }

    this.show = function (mod) {
        if (mod != this) { 
            return true;
        } else {
            return false;
        }
    }
    this.activeComponents = [this.getId()];
    this.components = [this];
}

var c=new component()

g.ComponentManager =c.getPublic();


function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function dragenter(e) {
    //console.log("enter!", this)
    if (source != this) {
        if (isbefore(source, this)) {
            this.parentNode.insertBefore(source, this);
        }
        else {
            this.parentNode.insertBefore(source, this.nextSibling);
        }
    }
}

function dragenterdiv(e) {
    // we always insert before a divider
    this.parentNode.insertBefore(source, this);
}

function dragstart(e) {
    //console.log("start!", this)
    source = this;
    e.originalEvent.dataTransfer.effectAllowed = 'move';
}

$(document).ready(function () {
    $(".drag").on('dragenter', dragenter);
    $(".drag").on('dragstart', dragstart);
    $(".divider").on('dragenter', dragenterdiv);
});


