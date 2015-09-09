/*global define, angular*/
define(['app', 'services/corporationServices'], function (app) {
    'use strict';
    app.factory('Corporation', ['CorporationServices', function (CorporationServices) {
        
        function Corporation() {
            this.money = 2000; //TODO: Corporation Constants
            this.stock = 100;  //TODO: Corporation Constants
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
                //TODO: Business logic
                this.money += 1;
            },
            hire: function (title) {
                var i, cost;
                for (i = 0; i < this.jobs.length; i += 1) {
                    if (this.jobs[i].title === title) {
                        cost = this.jobs[i].getCost();
                        if (this.money > cost) {
                            this.money -= cost;
                            this.jobs[i].hire();
                        }
                        //TODO: Notify: Not enough money !
                        return;
                    }
                }
            }
        };
        
        return Corporation;
    }]);
});
