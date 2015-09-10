/*global define, angular, CryptoJS*/
define(['app', 'cryptoJS', 'entities/corporation'], function (app) {
    'use strict';
    app.factory('SaveLoadServices', ['Corporation', 'MetaConstants', function (Corporation, MetaConstants) {

		var KEY_DECRYPT = "Wow. Much encryption. So secure.";

		function getDecryptedSave(encryptedSave) {
			var decryptedJson = CryptoJS.AES.decrypt(encryptedSave, KEY_DECRYPT).toString(CryptoJS.enc.Utf8);
			return angular.fromJson(decryptedJson);
		}
			
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
                localStorage.setItem('corpSaved', CryptoJS.AES.encrypt(JSON.stringify(save), KEY_DECRYPT));
                return;
            },
            load: function () {
                //localStorage.clear(); //FIXME: DEBUG ONLY !		
                var save = localStorage.getItem('corpSaved'),					//Saved game
                    corporation = new Corporation(),                            //Main game object
                    elapsedTime;                                                //Time eslaped since the last save

                if (typeof save !== 'undefined' && save !== null) {
					save = getDecryptedSave(save);
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
