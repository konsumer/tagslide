'use strict';

angular.module('controllers')
.controller('TagCtrl', function ($scope, $sce, $interval, $timeout, $routeParams, $animate, App, fullscreen) {
	// TODO: handle successful route so refresh isn't needed
	$scope.app = new App();
	$scope.theme = 'dark';
	$scope.current_tag = $routeParams.tag;
	var internal_current=0;

	function updateActive(){
		$scope.active = $scope.app.approved[ (internal_current++) % $scope.app.approved.length ];
	}
	
	$timeout(updateActive, 500);
	$interval(updateActive,3000);

	$scope.fullscreen = fullscreen;
});
