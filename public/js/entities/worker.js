/*global define*/
define(['app', 'entities/job'], function (app) {
    'use strict';
    app.factory('Worker', ['Job', function (Job) {
        
        function Worker(title, baseCost, productivity) {
            Job.apply(this, arguments);
            this.productivity = productivity;
        }
        
        Worker.prototype = new Job();

        return Worker;
    }]);
});
