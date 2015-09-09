/*global define, angular*/
define(['app', 'entities/worker', 'entities/seller'], function (app) {
    'use strict';
    app.factory('CorporationServices', ['Worker', 'Seller', function (Worker, Seller) {
        return {
            initializeJobs: function () {
                return [
                    new Worker('Worker', 100, 1), //TODO: Corporation contants
                    new Seller('Seller', 1000, 2) //TODO: Corporation contants
                ];
            },
            getJobs: function (jobs) {
                var i,                      // Index of the jobs loop
                    job,                    // Non-instanciated job (typed Object)
                    corporationJob,         // Instanciated job (Worker, Seller, etc.)
                    corporationJobs = [];   // List of all instancated jobs
                
                for (i = 0; i < jobs.length; i += 1) {
                    job = jobs[i];
                    switch (job.title) {
                    case 'Worker':
                        corporationJob = new Worker(job.title, 100, 1);  //TODO: Corporation contants
                        corporationJob.quantity = job.quantity;
                        break;
                    case 'Seller':
                        corporationJob = new Seller(job.title, 1000, 2);  //TODO: Corporation contants
                        corporationJob.quantity = job.quantity;
                        break;
                    }
                    corporationJobs.push(corporationJob);
                }
                return corporationJobs;
            }
        };
    }]);
});
