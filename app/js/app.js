'use strict';

var defaultTag = 'instagramvideo';


angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

angular.module('tagslide', [
	'controllers',
	'filters',
	'services',
	'ngResource',
	'ngRoute',
	'ui.bootstrap'
])

.config(function($routeProvider){
	$routeProvider
     .when('/admin',
        {
            controller: 'Admin',
            templateUrl: '/views/admin.html'
        })
    .when('/:tag',
        {
            controller: 'Main',
            templateUrl: '/views/main.html'
        })
    .otherwise({ redirectTo: '/' + defaultTag });
});