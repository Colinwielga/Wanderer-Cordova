// TODO get better typing for angular https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angularjs/angular.d.ts
//declare var angular: any;

var g = {};

var App = angular.module("wandererApp", []);

App.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('images/');
    }]);


g.Wanderer = {
    components: [],
    register: function (componentFactory) {
        var newComp = new componentFactory();
        for (var i = 0; i < g.Wanderer.components.length; i++) {
            if (g.Wanderer.components[i].getId() == newComp.getId()) {
                throw { mesage: "two components with the same id" }
            }
        }
        g.Wanderer.components.push(newComp);
    },
    //maybe this should be a dictonary
    getComponent:function (lookingFor) {
        for (var i = 0; i < g.Wanderer.components.length; i++) {
            var inner =g.Wanderer.components[i];
            if (lookingFor === inner.getId()) {
                return inner.getPublic();
            }
        } 
        throw {message:"could not find id: "+lookingFor};
}
};

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


