// TODO get better typing for angular https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angularjs/angular.d.ts
//declare var angular: any;

var g = {};

var App = angular.module("wandererApp", ['ngSanitize']);


// source:
// http://stackoverflow.com/questions/13781685/angularjs-ng-src-equivalent-for-background-imageurl
App.directive('backImg', function () {
    return function (scope, element, attrs) {
        attrs.$observe('backImg', function (value) {
            element.css({
                'background-image': 'url(' + value + ')',
                'background-size': 'cover'
            });
        });
    };
});

App.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('images/');
    }]);


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


