/*global define, angular*/
define(['angularAMD', 'angular-route'], function (angularAMD) {
    'use strict';
    var app = angular.module('idleCorp', ['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
            templateUrl: '../views/Home.html',
            controller: 'MainCtrl',
            controllerUrl: 'controllers/mainCtrl'
        }));
    });
    return angularAMD.bootstrap(app);
});
