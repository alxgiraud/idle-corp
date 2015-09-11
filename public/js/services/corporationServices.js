/*global define, angular*/
define(['app', 'entities/worker', 'entities/seller', 'entities/recruiter'], function (app) {
    'use strict';
    app.factory('CorporationServices', ['Worker', 'Seller', 'Recruiter', 'CorporationConstants', function (Worker, Seller, Recruiter, CorporationConstants) {
        return {
            initializeJobs: function () {
                return [
                    new Worker(
                        CorporationConstants.WORKER_TITLE,
                        CorporationConstants.WORKER_BASECOST,
                        CorporationConstants.WORKER_PRODUCTION
                    ),
                    new Seller(
                        CorporationConstants.SELLER_TITLE,
                        CorporationConstants.SELLER_BASECOST,
                        CorporationConstants.SELLER_PRODUCTION,
                        CorporationConstants.SELLER_CONSUMPTION
                    ),
                    new Recruiter(
                        CorporationConstants.RECRUITER_TITLE,
                        CorporationConstants.RECRUITER_BASECOST,
                        [
                            CorporationConstants.WORKER_TITLE,
                            CorporationConstants.SELLER_TITLE
                        ],
                        CorporationConstants.RECRUITER_PERFORMANCE
                    )
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
                    case CorporationConstants.WORKER_TITLE:
                        corporationJob = new Worker(job.title, job.baseCost,
												job.production);
                        break;
                    case CorporationConstants.SELLER_TITLE:
                        corporationJob = new Seller(job.title, job.baseCost,
												job.production, job.consumption);
                        break;
                    case CorporationConstants.RECRUITER_TITLE:
                        corporationJob = new Recruiter(job.title, job.baseCost,
												job.targetedJobs, job.performance);
                        break;
                    }
					corporationJob.quantity = job.quantity;
					corporationJob.manualHiring = job.manualHiring;
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
                var workers = this.getJobByTitle(jobs, CorporationConstants.WORKER_TITLE);
                
                //TODO: Production Management hierarchy : workers.getProduction() ?
                
                return workers.production * workers.getQuantity();
            },
            getSalesActivity: function (jobs, stock) {
                var sellers = this.getJobByTitle(jobs, CorporationConstants.SELLER_TITLE),
                    unitProfit,
                    salesActivity = {
                        productSold: 0,
                        profit: 0
                    };
                
                //TODO: Sales Management hierarchy : sellers.getSalesActivity() ?

                salesActivity.productSold = sellers.consumption * sellers.getQuantity();
                salesActivity.profit = sellers.production * sellers.getQuantity();
                
                if (stock < salesActivity.productSold) {
                    unitProfit = (salesActivity.productSold !== 0) ?
                            salesActivity.profit / salesActivity.productSold : 0;
                    salesActivity.productSold = stock;
                    salesActivity.profit = stock * unitProfit;
                }
                return salesActivity;
            },
            hireByRecruiter: function (jobs) {
                var recruiter = this.getJobByTitle(jobs, CorporationConstants.RECRUITER_TITLE),
                    i,
                    job;
                
				//TODO: HR Hierarchy: recruiter.getHiring() ?
				
                for (i = 0; i < recruiter.targetedJobs.length; i += 1) {
                    job = this.getJobByTitle(jobs, recruiter.targetedJobs[i]);
                    job.quantity += recruiter.performance * recruiter.quantity;
                }
                
                return jobs;
            }
        };
    }]);
});
