'use strict';

angular.module('controllers')
.controller('MainCtrl', function ($scope, socket, instagram) {
	$scope.tags = [];
	$scope.tag = 'instagramvideo'

	$scope.themes = ['dark'];
	$scope.theme = "dark";

	socket.on('tag:add', function (tag) {
		$scope.tags.push(tag);
	});

	socket.on('tag:remove', function (id) {
		var i = array.indexOf(id);
		if (i > -1) {
			$scope.tags.splice(i, 1);
		}
	});

	
});
