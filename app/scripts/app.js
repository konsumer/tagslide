'use strict';

angular.module('controllers', []);
angular.module('services', []);
angular.module('filters', []);
angular.module('directives', []);
angular.module('factories', [])

angular.module('tagslideApp', [
  'filters',
  'directives',
  'services',
  'factories',
  'controllers',
  'ngResource',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
