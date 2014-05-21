'use strict';

var defaultTag = 'instagramvideo';


angular.module('controllers', []);
angular.module('filters', []);
angular.module('services', []);

require('./controllers/Admin.js');
require('./controllers/FormModal.js');
require('./controllers/Main.js');
require('./filters/hasTag.js');
require('./filters/isApproved.js');
require('./filters/isNotApproved.js');
require('./services/fullscreen.js');
require('./services/Post.js');
require('./services/Tag.js');

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