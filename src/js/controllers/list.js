'use strict';

angular.module('controllers')
  .controller('ListCtrl', function ($scope, $rootScope, App) {
  	$scope.app = $rootScope.app;
  });
