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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/:tag', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: defaultTag
      });
  });
