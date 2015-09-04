/*global define, angular, gameConstants*/
define(['app'], function (app) {
    'use strict';
    app.factory('SaveLoadServices', [function (corporation) {
        
        function simulateGrowth(corporation, elapsedTime) {
            var elapsedTicks = (elapsedTime > gameConstants.TIME_INTERVAL) ?
                    Math.round(elapsedTime / gameConstants.TIME_INTERVAL) : 1, //Ticks eslaped since the last save
                i; //Index for each ticks simulated

            for (i = 0; i < elapsedTicks; i += 1) {
                corporation += 1; //TODO: Corporation.growth()
            }

            return corporation;
        }

        return {
            save: function (corporation) {
                var save = {
                    corporation: corporation,
                    date: Date.now()
                };

                localStorage.setItem('corpSaved', JSON.stringify(save));
                return;
            },
            load: function () {
                var save = angular.fromJson(localStorage.getItem('corpSaved')), //Saved game
                    corporation, //Main game object
                    elapsedTime; //Time eslaped since the last save

                if (typeof save !== 'undefined' && save !== null) {
                    corporation = (save.hasOwnProperty('corporation')) ? save.corporation : null; //TODO: SetCorp()? angular.JSON?
                    elapsedTime = (save.hasOwnProperty('date')) ? Date.now() - save.date : null;
                    corporation = simulateGrowth(corporation, elapsedTime);
                }

                if (corporation === null) {
                    corporation = 0; //TODO: Corporation.CreateNewCorporation()
                }

                return corporation;
            }
        };
    }]);
});
