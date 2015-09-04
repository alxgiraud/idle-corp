/*global app, addEventListener, gameConstants*/
app.controller('mainCtrl', ['$scope', '$interval', 'SaveLoadServices', function ($scope, $interval, SaveLoadServices) {
    'use strict';
    var elapsedTime,        //Time elasped between each tick
        date = Date.now(),  //Time at the end of the tick
        elapsedTicks,       //Ticks eslaped between each tick (1 if no gap)
        i,                  //Index of the incremental loop
        corporation = 0;    //TODO: manage real game object
          
    //Load previous game (if it exists)
    corporation = SaveLoadServices.load();
    
    //Save when the player close the tab/window
    addEventListener('unload', function () {
        SaveLoadServices.save(corporation);
    });
    
    //Auto-saving each minute (if browser crash)
    $interval(function () {
        SaveLoadServices.save(corporation);
    }, gameConstants.AUTOSAVE_INTERVAL);
    
    $interval(function () {
        elapsedTime = Date.now() - date;
        elapsedTicks = (elapsedTime > gameConstants.TIME_INTERVAL) ?
                Math.round(elapsedTime / gameConstants.TIME_INTERVAL) : 1;

        for (i = 0; i < elapsedTicks; i += 1) {
            corporation += 1;
        }
        $scope.i = corporation;
        
        date = Date.now();
    }, gameConstants.TIME_INTERVAL);
    
}]);