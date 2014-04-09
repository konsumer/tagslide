'use strict';

angular.module('controllers')
.controller('AdminCtrl', function ($scope, App, Socket) {
	$scope.app = new App();
	$scope.alerts = [];

	function savePost(post){
		Socket.emit('post', post, function(err){
			if (err){
				console.log('post save error', err);
			}else{
				console.log('post saved.');
			}
		});
	}

	$scope.approve = function(post){
		post.approved = true;
		savePost(post);
	}

	$scope.disapprove = function(post){
		post.approved = false;
		savePost(post);
	}
});
