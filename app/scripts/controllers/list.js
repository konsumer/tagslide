'use strict';

angular.module('tagslideApp')
  .controller('ListCtrl', function ($scope, $rootScope, App) {
  	$scope.app = $rootScope.app;
  });
