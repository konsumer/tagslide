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
					comment.text = $sce.trustAsHtml(emojione.toImage(comment.text)); return comment;
				});
			}
			$scope.$apply();
		});

		$scope.fullscreen = function() {
			if (!document.fullscreenElement &&    // alternative standard method
				!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
			} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			}
		};
	})