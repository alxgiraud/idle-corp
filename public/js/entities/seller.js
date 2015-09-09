/*global define*/
define(['app', 'entities/worker'], function (app) {
    'use strict';
    app.factory('Seller', ['Worker', function (Worker) {
        
        function Seller(title, baseCost, productivity) {
            Worker.apply(this, arguments);
            this.consumption = 1;  //TODO: Corporation contants
        }
        
        Seller.prototype = new Worker();

        return Seller;
    }]);
});
