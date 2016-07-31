// TODO get better typing for angular https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/angularjs/angular.d.ts
//declare var angular: any;

var App = angular.module("wandererApp", []);

App.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('images/');
}]);