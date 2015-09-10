/*global define, angular*/
define(['app', 'entities/corporation'], function (app) {
    'use strict';
    app.factory('SaveLoadServices', ['Corporation', 'MetaConstants', function (Corporation, MetaConstants) {

        function simulateGrowth(corporation, elapsedTime) {
            var elapsedTicks = (elapsedTime > MetaConstants.TIME_INTERVAL) ?
                    Math.round(elapsedTime / MetaConstants.TIME_INTERVAL) : 1,  //Ticks eslaped since the last save
                i;                                                              //Index for each ticks simulated

            for (i = 0; i < elapsedTicks; i += 1) {
                corporation.grow();
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
                localStorage.clear(); //FIXME: DEBUG ONLY !
                var save = angular.fromJson(localStorage.getItem('corpSaved')), //Saved game
                    corporation = new Corporation(),                            //Main game object
                    elapsedTime;                                                //Time eslaped since the last save

                if (typeof save !== 'undefined' && save !== null) {
                    corporation = (save.hasOwnProperty('corporation') && save.corporation !== null) ?
                            corporation.setCorporation(save.corporation) : new Corporation();
                    
                    elapsedTime = (save.hasOwnProperty('date')) ?
                            Date.now() - save.date : null;
                    corporation = simulateGrowth(corporation, elapsedTime);
                }
                return corporation;
            }
        };
    }]);
});
