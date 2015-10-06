/*global define, angular*/
define(['app', 'services/corporationServices'], function (app) {
	'use strict';
	app.factory('Corporation', ['CorporationServices', 'CorporationConstants', function (CorporationServices, CorporationConstants) {

		function Corporation() {
			this.money = CorporationConstants.MONEY_INIT;
			this.profit = 0;
			this.stock = 0;
			this.stockGrowth = 0;
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
				var productProduced = 0,
					salesActivity = {
						productSold: 0,
						profit: 0
					};


				productProduced = CorporationServices.getWorkerProduction(this.jobs);
				this.stock += productProduced;

				salesActivity = CorporationServices.getSalesActivity(this.jobs, this.stock);
				this.stock -= salesActivity.productSold;

				this.stockGrowth = productProduced - salesActivity.productSold;

				this.profit = salesActivity.profit;
				this.money += this.profit;

				this.jobs = CorporationServices.hireByRecruiter(this.jobs);
			},
			hire: function (title) {
				var job = CorporationServices.getJobByTitle(this.jobs, title),
					cost = job.getCost();

				if (this.money > cost) {
					this.money -= cost;
					job.hire();
				}
				return;
			},
			isHirable: function (title) {
				var job = CorporationServices.getJobByTitle(this.jobs, title),
					cost = job.getCost();
				return (this.money > cost) ? true : false;
			}
		};

		return Corporation;
    }]);
});
