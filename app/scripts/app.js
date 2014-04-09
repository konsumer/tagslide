'use strict';

var defaultTag = "instagramvideo";

angular.module('controllers', []);
angular.module('services', []);
angular.module('filters', []);
angular.module('directives', []);
angular.module('factories', []);

angular.module('tagslideApp', [
  'filters',
  'directives',
  'services',
  'factories',
  'controllers',
  'ngResource',
  'ngRoute',
  'ngCookies',
  'ngAnimate',
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
