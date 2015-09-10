/*global define, angular*/
define(['angularAMD', 'angular-route'], function (angularAMD) {
    'use strict';
    var app = angular.module('idleCorp', ['ngRoute']);
    
    app.constant('MetaConstants', {
        TIME_INTERVAL: 100,
        AUTOSAVE_INTERVAL: 60000
    });
    
    app.constant('CorporationConstants', {
        MONEY_INIT: 1000,
        
        WORKER_TITLE: 'Worker',
        WORKER_BASECOST: 100,
        WORKER_PRODUCTION: 0.3,
            
        SELLER_TITLE: 'Seller',
        SELLER_BASECOST: 150,
        SELLER_PRODUCTION: 0.5,
        SELLER_CONSUMPTION: 0.3,
        
        RECRUITER_TITLE: 'Recruiter',
        RECRUITER_BASECOST: 500,
        RECRUITER_PERFORMANCE: 0.01
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