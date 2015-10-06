/*global define*/
define(['angularAMD'], function (angularAMD) {
	'use strict';
	angularAMD.filter('bigNumber', function () {

		function formalizeNumber(input, decimal, pow, abbrv) {
			if (typeof pow === 'undefined' || pow === null) {
				return input.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			}
			return ((input / Math.pow(10, pow)).toFixed(decimal) + abbrv).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}

		return function (number) {
			var abs = 0;
			if (typeof number === 'undefined' || number === null) {
				return 0;
			}

			abs = Math.abs(number);

			if (abs >= Math.pow(10, 15)) {
				number = formalizeNumber(number, 2, 15, 'Q');
			} else if (abs >= Math.pow(10, 12)) {
				number = formalizeNumber(number, 2, 12, 'T');
			} else if (abs >= Math.pow(10, 9)) {
				number = formalizeNumber(number, 2, 9, 'B');
			} else if (abs >= Math.pow(10, 6)) {
				number = formalizeNumber(number, 2, 6, 'M');
			} else {
				number = formalizeNumber(number, 0);
			}

			return number;
		};
	});
});
