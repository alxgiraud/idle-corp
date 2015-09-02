/*global app, addEventListener, metaConstants*/
app.controller('mainCtrl', ['$scope', '$interval', function ($scope, $interval) {
    'use strict';
    var elapsedTime,        //Time elasped between each tick
        date = Date.now(),  //Time at the end of the tick
        elapsedTicks,       //Ticks eslaped between each tick (1 if no gap)
        i,                  //Index of the incremental loop
        debug = 0;          //TODO: Remove it
                
    addEventListener('unload', function () {
        //TODO: Save when the player close the tab/window
    });
    
    $interval(function () {
        elapsedTime = Date.now() - date;
        elapsedTicks = (elapsedTime > metaConstants.TIME_INTERVAL) ?
                Math.round(elapsedTime / metaConstants.TIME_INTERVAL) : 1;

        for (i = 0; i < elapsedTicks; i += 1) {
            debug += 1;
        }
        $scope.i = debug;
        
        date = Date.now();
    }, metaConstants.TIME_INTERVAL);
    
}]);