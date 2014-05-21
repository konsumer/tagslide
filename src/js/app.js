'use strict';

var defaultTag = 'instagramvideo';


angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

require('./controllers/Admin');
require('./controllers/FormModal');
require('./controllers/Main');
require('./filters/hasTag');
require('./filters/isApproved');
require('./filters/isNotApproved');
require('./services/fullscreen');
require('./services/Post');
require('./services/Tag');

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