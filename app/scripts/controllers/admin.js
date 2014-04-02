'use strict';

angular.module('controllers')
.controller('AdminCtrl', function ($scope, $sce, $timeout, socket, instagram) {
	$scope.okPosts = [];
	$scope.posts = [];
	$scope.tags = [];

	$scope.alerts = [];

	function updateInstagram(){
		$scope.tags.forEach(function(tag){
			instagram.get(tag)
				.success(function(response) {
					var posts = response.data.filter(function(p){
						return ($scope.posts.indexOf(p.id) === -1);
					});
					posts = posts.map(function(p){
						p.media = (p.type == 'image') ? p.images.standard_resolution.url : p.videos.standard_resolution.url;
						p.media = $sce.trustAsResourceUrl(p.media);
						p.user_img = $sce.trustAsResourceUrl(p.user.profile_picture);
						p.source = 'instagram';
						p.sourceTag = tag;
						p.source_id = p.id;
						return p;
					});
					$scope.posts = $scope.posts.concat(posts);
				});
		});
	}

	var addPost = function(post){
		var i = $scope.okPosts.indexOf(post.source_id);
		if (i === -1) {
			$scope.okPosts.push(post.source_id);
		}		
	}

	var removePost = function(post) {
		var i = $scope.okPosts.indexOf(post.source_id);
		if (i > -1) {
			$scope.okPosts.splice(i, 1);
		}		
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	function addAlert(msg, type){
		type = type || 'info';
		var l = $scope.alerts.length +0;
		$scope.alerts.push({type:type, msg:msg});
		$timeout(function(){$scope.closeAlert(l);}, 3000);
	}

	$scope.approve = function(post){
		socket.emit('/post/add', post, function (data) {
	    	if (data.error){
	    		addAlert(data.error, 'danger');
	    	}else{
	    		addPost(post);
	    		addAlert('approved ' + data.record.source_id, 'success');
	    	}
	    });
	}

	$scope.disapprove = function(post){
		socket.emit('/post/remove', post, function (data) {
	    	if (data.error){
	    		console.log(data.error);
	    		addAlert(data.error, 'danger');
	    	}else{
	    		removePost(post);
	    		addAlert('disapproved ' + data.record.source_id, 'success');
	    	}
	    });
	}

	$scope.videoError = function(vid){
		console.log("videoerror", vid);
	}

	// instagram called-back to our server
	socket.on('/instagram/tag', function (tag) {
		if ($scope.tag == tag){
			updateInstagram();
		}
	});

	//  a post has been OK'd
	socket.on('/post/add', addPost);

	//  a post has been removed
	socket.on('/post/remove', removePost);

	//  a tag has been added
	socket.on('/tag/add', function (id, tag) {
		var i = $scope.tags.indexOf(id);
		if (i === -1) {
			$scope.tags.push(id);
			updateInstagram();
		}
	});

	//  a tag has been removed
	socket.on('/tag/remove', function (id) {
		var i = $scope.tags.indexOf(id);
		if (i > -1) {
			$scope.tags.splice(i, 1);
			updateInstagram();
		}
	});	
});
