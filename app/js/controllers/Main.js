'use strict';

angular.module('controllers')
  .controller('Main', function ($scope, $interval, $sce, Post, Tag) {
    $scope.tag = 'instagramvideo';
    $scope.theme = 'dark';
    $scope.current = 0;

    // check for new posts
    function updateData(){
	    Post.findByTag({tag:'instagramvideo'},function(data){
	    	if ($scope.posts){
	    		var ids = $scope.posts.map(function(p){ return p.id; });
		    	data.payload.forEach(function(p){
		    		if (ids.indexOf(p.id) === -1){
		    			p.media = $sce.trustAsResourceUrl(p.media);
		    			p.user_img = $sce.trustAsResourceUrl(p.user_img);
		    			$scope.posts.push(p);
		    		}
		    	});
	    	}else{
	    		var posts = data.payload.map(function(p){
		    		p.media = $sce.trustAsResourceUrl(p.media);
		    		p.user_img = $sce.trustAsResourceUrl(p.user_img);
		    		return p;
		    	});
	    		$scope.posts = posts;
	    	}
	    	
	    });
	}
	$interval(updateData, 30000);
	updateData();

	function updateSlide(){
		if ($scope.posts){
			var current = $scope.current+1;
			$scope.current = current % $scope.posts.length;
		}
	}
	$interval(updateSlide, 10000);
	updateSlide();

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
	}

  })