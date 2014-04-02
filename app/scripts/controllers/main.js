'use strict';

angular.module('controllers')
.controller('MainCtrl', function ($scope, $location, $interval, $sce, socket, instagram, fullscreen) {
	$scope.themes = ['dark', 'light'];
	$scope.theme = "dark";
	$scope.okPosts = [];
	$scope.posts = [];
	$scope.current = 0;
	$scope.tag = $location.path().substr(1);

	$scope.$watch('theme', function(){
		var $bod = angular.element(document.body);
		$bod.removeClass('theme_' + $scope.themes.join(' theme_'));
		$bod.addClass('theme_' + $scope.theme);
	});

	$scope.$watch('tag', function(){
		$scope.posts = [];
		updateInstagram();
	});

	function updateInstagram(){
		instagram.get($scope.tag)
			.success(function(response) {
				var posts = response.data.filter(function(p){
					return ($scope.posts.indexOf(p.id) === -1);
				});
				posts = posts.map(function(p){
					p.media = (p.type == 'image') ? p.images.standard_resolution.url : p.videos.standard_resolution.url;
					p.media = $sce.trustAsResourceUrl(p.media);
					p.user_img = $sce.trustAsResourceUrl(p.user.profile_picture);
					p.approved = ($scope.okPosts.indexOf(p.id) !== -1);
					return p;
				});
				$scope.posts = $scope.posts.concat(posts);
			});
	}

	$interval(function(){
		if ($scope.posts){
			$scope.current = ($scope.current+1) % $scope.posts.length;
		}
		console.log($scope.current);
	}, 3000);

	$scope.fullscreen = fullscreen;

	// instagram called-back to our server
	socket.on('/instagram/tag', function (tag) {
		if ($scope.tag == tag){
			updateInstagram();
		}
	});

	//  a post has been OK'd
	socket.on('/post/add', function (post) {
		var i = $scope.okPosts.indexOf(post.source_id);
		if (i === -1) {
			$scope.okPosts.push(post.source_id);
		}
	});

	//  a post has been removed
	socket.on('/post/remove', function (post) {
		var i = $scope.okPosts.indexOf(post.source_id);
		if (i > -1) {
			$scope.okPosts.splice(i, 1);
		}
	});
});
