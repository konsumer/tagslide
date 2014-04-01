'use strict';

angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

angular.module('tagslide', [
	'controllers',
	'filters',
	'services',
	'ngResource',
	'ui.bootstrap'
])