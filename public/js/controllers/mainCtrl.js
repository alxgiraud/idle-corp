/*global define, addEventListener*/
define(['app', 'services/saveLoadServices'], function (app) {
    'use strict';
    
    app.controller('MainCtrl', ['$scope', '$interval', 'MetaConstants', 'SaveLoadServices', function ($scope, $interval, MetaConstants, SaveLoadServices) {
        
        var elapsedTime,                            //Time elasped between each tick
            date = Date.now(),                      //Time at the end of the tick
            elapsedTicks,                           //Ticks eslaped between each tick (1 if no gap)
            i,                                      //Index of the incremental loop
            corporation = SaveLoadServices.load();  //Load previous game (if it exists)

        //Save when the player close the tab/window
        addEventListener('unload', function () {
            SaveLoadServices.save(corporation);
        });

        //Auto-saving each minute (if browser crash)
        $interval(function () {
            SaveLoadServices.save(corporation);
        }, MetaConstants.AUTOSAVE_INTERVAL);

        //Main game loop
        $interval(function () {
            elapsedTime = Date.now() - date;
            elapsedTicks = (elapsedTime > MetaConstants.TIME_INTERVAL) ?
                    Math.round(elapsedTime / MetaConstants.TIME_INTERVAL) : 1;

            for (i = 0; i < elapsedTicks; i += 1) {
                corporation.grow();
            }
            
            $scope.corporation = corporation;

            date = Date.now();
        }, MetaConstants.TIME_INTERVAL);

        $scope.hasEnoughMoney = function (jobTitle) {
            return corporation.isHirable(jobTitle);
        };
        
        $scope.hire = function (jobTitle) {
            corporation.hire(jobTitle);
        };
        
        $scope.dumpCorp = function () { //NOTE: To remove. DEBUG only
            console.log(corporation);
        };

		//NOTE: To remove. Debug only.
		$scope.test = "<p>Lorem ipsum <strong>dolor sit amet, </strong>consectetur adipiscing <em>elit. Pellentesque cursus</em></p>Lorem ipsum dolor sit amet, purto ludus moderatius vel cu. Vix no apeirian reprimique, eos an ipsum propriae intellegam. Sanctus tacimates at vix. Eos ad duis solum veniam, lorem salutatus mediocritatem eum ut, omnis persequeris vel at. Nam no erroribus molestiae, insolens adversarium necessitatibus cu duo, eos ea reque temporibus. Eius idque cum no, odio adipisci mea ut."; //FIXME: test typewrite directive
    }]);
});
