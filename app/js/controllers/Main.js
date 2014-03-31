'use strict';

angular.module('tagslide')
  .controller('Main', function ($scope, $resource, $interval, $sce) {
    $scope.tag = 'instagramvideo';
    $scope.theme = 'dark';

    $scope.current =0;

    var Post = $resource('/rest/post/finder/tag/:tag');

    // check for new posts
    function updateData(){
	    Post.get({tag:'instagramvideo'},function(data){
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

  })