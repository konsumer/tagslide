'use strict';

angular.module('tagslideApp')
  .controller('ListCtrl', function ($scope, App) {
  	$scope.app = new App();
  });
