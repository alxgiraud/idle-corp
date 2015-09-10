/*global define, angular*/
define(['app', 'entities/worker', 'entities/seller'], function (app) {
    'use strict';
    app.factory('CorporationServices', ['Worker', 'Seller', function (Worker, Seller) {
        return {
            initializeJobs: function () {
                return [
                    new Worker('Worker', 100, 1), //TODO: Corporation contants
                    new Seller('Seller', 200, 2) //TODO: Corporation contants
                ];
            },
            getJobs: function (jobs) {      //TODO: Constants Jobtitle
                var i,                      // Index of the jobs loop
                    job,                    // Non-instanciated job (typed Object)
                    corporationJob,         // Instanciated job (Worker, Seller, etc.)
                    corporationJobs = [];   // List of all instancated jobs

                for (i = 0; i < jobs.length; i += 1) {
                    job = jobs[i];
                    switch (job.title) {
                    case 'Worker':
                        corporationJob = new Worker(job.title, 100, 1); //TODO: Corporation contants
                        corporationJob.quantity = job.quantity;
                        break;
                    case 'Seller':
                        corporationJob = new Seller(job.title, 200, 2); //TODO: Corporation contants
                        corporationJob.quantity = job.quantity;
                        break;
                    }
                    corporationJobs.push(corporationJob);
                }
                return corporationJobs;
            },
            getJobByTitle: function (jobs, title) {
                var i;
                for (i = 0; i < jobs.length; i += 1) {
                    if (jobs[i].title === title) {
                        return jobs[i];
                    }
                }
                return;
            },
            getWorkerProduction: function (jobs) {
                var workers = this.getJobByTitle(jobs, 'Worker'); //TODO: Job constants
                
                //TODO: Production Management hierarchy
                
                return workers.production * workers.quantity;
            },
            getSalesActivity: function (jobs, stock) {
                var sellers = this.getJobByTitle(jobs, 'Seller'), //TODO: Job constants
                    unitProfit,
                    salesActivity = {
                        productSold: 0,
                        profit: 0
                    };
                
                //TODO: Sales Management hierarchy

                salesActivity.productSold = sellers.consumption * sellers.quantity;
                salesActivity.profit = sellers.production * sellers.quantity;
                
                if (stock < salesActivity.productSold) {
                    unitProfit = (salesActivity.productSold !== 0) ?
                            salesActivity.profit / salesActivity.productSold : 0;
                    salesActivity.productSold = stock;
                    salesActivity.profit = stock * unitProfit;
                }
                
                return salesActivity;
            }
        };
    }]);
});
