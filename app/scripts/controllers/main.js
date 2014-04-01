'use strict';

angular.module('controllers')
.controller('MainCtrl', function ($scope, socket) {
	$scope.tags = [];

	socket.on('tag:add', function (tag) {
		$scope.tags.push(tag);
	});

	socket.on('tag:remove', function (id) {
		for (var t in $scope.tags){
			if ($scope.tags[t]['_id'] == id){
				delete $scope.tags[t];
				break;
			}
		}
	});

	
});
