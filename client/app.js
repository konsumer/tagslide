angular.module('app', ['ngAnimate'])
    .controller('MainCtrl', function ($scope, $sce) {
    	$scope.posts = [];
    	io = io.connect();
    	io.emit('ready');
    	io.on('post', function(post) {
		    $scope.posts.shift();
		    post.media = $sce.trustAsResourceUrl(post.media);
		    post.caption = $sce.trustAsHtml(emojione.toImage(post.caption));
		    $scope.posts.push(post);
		    $scope.tag = post.tag;
		    if (post.comments){
		    	post.comments = post.comments.map(function(comment){
		    		comment.text = $sce.trustAsHtml(comment.text); return comment;
		    	});
		    }
		    $scope.$apply();
		});
    });