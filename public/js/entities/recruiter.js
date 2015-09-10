/*global define*/
define(['app', 'entities/job'], function (app) {
    'use strict';
    app.factory('Recruiter', ['Job', function (Job) {
        
        function Recruiter(title, baseCost, targetedJobs, performance) {
            Job.apply(this, arguments);
            this.targetedJobs = targetedJobs;
            this.performance = performance;
        }
        
        Recruiter.prototype = new Job();

        return Recruiter;
    }]);
});
