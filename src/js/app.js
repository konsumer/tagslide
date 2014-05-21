'use strict';

var defaultTag = "instagramvideo";

angular.module('controllers', []);
angular.module('services', []);
angular.module('filters', []);
angular.module('directives', []);
angular.module('factories', []);

require('./controllers/admin');
require('./controllers/list');
require('./controllers/tag');
require('./factories/socket');
require('./services/fullscreen');
require('./services/app');


angular.module('tagslide', [
  'filters',
  'directives',
  'services',
  'factories',
  'controllers',
  'ngResource',
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);

    $routeProvider
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/tag/:tag', {
        templateUrl: 'views/tag.html',
        controller: 'TagCtrl'
      })
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  
  .run(function ($rootScope, App) {
    $rootScope.$on('$locationChangeSuccess', function () {
        // service singleton not working...
        if (!$rootScope.app){
          $rootScope.app = new App();
        }
    });
  });
