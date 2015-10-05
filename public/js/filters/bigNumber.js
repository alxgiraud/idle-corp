/*global define*/
define(['angularAMD'], function (angularAMD) {
	'use strict';
	angularAMD.filter('bigNumber', function () {
		return function (number) {
			var abs = 0;
			if (typeof number === 'undefined' || number === null) {
				return null;
			}

			abs = Math.abs(number);

			//TODO: Cleaning: code function like GetFormatedNumber(input, pow, decimals, abbreviation)?
			if (abs >= Math.pow(10, 15)) {
				number = (number / Math.pow(10, 15)).toFixed(2) + 'Q';
			} else if (abs >= Math.pow(10, 12)) {
				number = (number / Math.pow(10, 12)).toFixed(2) + 'T';
			} else if (abs >= Math.pow(10, 9)) {
				number = (number / Math.pow(10, 9)).toFixed(2) + 'B';
			} else if (abs >= Math.pow(10, 6)) {
				number = (number / Math.pow(10, 6)).toFixed(2) + 'M';
			} else {
				return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			}

			return number.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		};
	});
});
