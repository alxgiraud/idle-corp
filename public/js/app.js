/*global define, angular*/
define(['angularAMD', 'angular-route'], function (angularAMD) {
    'use strict';
    var app = angular.module('idleCorp', ['ngRoute']);
    
    app.constant('MetaConstants', {
        TIME_INTERVAL: 100,
        AUTOSAVE_INTERVAL: 60000
    });
    
    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
            templateUrl: '../views/home.html',
            controller: 'MainCtrl',
            controllerUrl: 'controllers/mainCtrl'
        }));
    });
    return angularAMD.bootstrap(app);
});