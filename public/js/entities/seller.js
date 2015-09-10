/*global define*/
define(['app', 'entities/worker'], function (app) {
    'use strict';
    app.factory('Seller', ['Worker', function (Worker) {
        
        function Seller(title, baseCost, production, consumption) {
            Worker.apply(this, arguments);
            this.consumption = consumption;
        }
        
        Seller.prototype = new Worker();

        return Seller;
    }]);
});
