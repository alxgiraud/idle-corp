/*global define, angular*/
define(['app', 'services/corporationServices'], function (app) {
    'use strict';
    app.factory('Corporation', ['CorporationServices', function (CorporationServices) {

        function Corporation() {
            this.money = 2000;      //TODO: Corporation Constants
            this.stock = 100;       //TODO: Corporation Constants
            this.jobs = CorporationServices.initializeJobs();
        }

        Corporation.prototype = {
            setCorporation: function (corporation) {
                //TODO: Check Model from save
                this.money = corporation.money;
                this.stock = corporation.stock;
                this.jobs = CorporationServices.getJobs(corporation.jobs);
                return this;
            },
            grow: function () {
                var salesActivity = {
                    productSold: 0,
                    profit: 0
                };
                this.stock += CorporationServices.getWorkerProduction(this.jobs);

                salesActivity = CorporationServices.getSalesActivity(this.jobs, this.stock);
                this.stock -= salesActivity.productSold;
                this.money += salesActivity.profit;
            },
            hire: function (title) {
                var job = CorporationServices.getJobByTitle(this.jobs, title),
                    cost = job.getCost();
                
                if (this.money > cost) {
                    this.money -= cost;
                    job.hire();
                }
                //TODO: Notify: Not enough money !
            }
        };

        return Corporation;
    }]);
});
