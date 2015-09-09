/*global define*/
define(['app'], function (app) {
    'use strict';
    app.factory('Job', [function () {
        
        function Job(title, baseCost) {
            this.title = title;
            this.quantity = 0;
            this.baseCost = baseCost;
        }

        Job.prototype = {
            hire: function () {
                this.quantity += 1;
                return;
            },
            getCost: function () {
                return this.baseCost * Math.pow(1.07, this.quantity);
            }
        };

        return Job;
    }]);
});
