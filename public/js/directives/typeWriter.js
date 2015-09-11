/*global define*/
define(['angularAMD'], function (angularAMD) {
	'use strict';
	angularAMD.directive('typeWriter', ['$interval', function ($interval) {
		function printText(scope, element, attrs) {

			var index = 0,
				speed = attrs.typeSpeed || 100,
				content = attrs.typeContent,
				char,
				timer = $interval(function () {
					char = content.charAt(index);

					if (char === '<') {
						index = content.indexOf('>', index);
					}
					element.html(content.substr(0, index));
					index += 1;

					if (index === content.length) {
						$interval.cancel(timer);
						return;
					}

				}, speed);
		}

		return {
			restrict: 'E',
			link: printText
		};
	}]);
});
