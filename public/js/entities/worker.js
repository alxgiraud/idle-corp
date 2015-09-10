/*global define*/
define(['app', 'entities/job'], function (app) {
    'use strict';
    app.factory('Worker', ['Job', function (Job) {
        
        function Worker(title, baseCost, production) {
            Job.apply(this, arguments);
            this.production = production;
        }
        
        Worker.prototype = new Job();

        return Worker;
    }]);
});
