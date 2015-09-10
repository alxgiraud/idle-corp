/*global define*/
define(['app'], function (app) {
    'use strict';
    app.factory('Job', [function () {
        
        function Job(title, baseCost) {
            this.title = title;
            this.quantity = 0;
            this.manualHiring = 0;
            this.baseCost = baseCost;
        }

        Job.prototype = {
            hire: function () {
                this.manualHiring += 1;
                this.quantity += 1;
                return;
            },
            getCost: function () {
                return this.baseCost * Math.pow(1.07, this.manualHiring);
            },
            setQuantity: function (quantity) {
                this.quantity = quantity;
                return;
            },
            getQuantity: function () {
                return Math.floor(this.quantity);
            }
        };

        return Job;
    }]);
});
