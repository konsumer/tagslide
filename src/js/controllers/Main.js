'use strict';

angular.module('controllers')
  .controller('Main', function ($scope, $interval, $location, Post, Tag, fullscreen) {
    $scope.tag = $location.path().substr(1);
    
    $scope.theme = 'dark';
    $scope.current = 0;

    // check for new posts
    function updateData(){
	    Post.findByTag({tag:$scope.tag},function(data){
	    	if ($scope.posts){
	    		var ids = $scope.posts.map(function(p){ return p.id; });
	    		data.forEach(function(p){
					if (ids.indexOf(p.id) === -1){
						$scope.posts.push(p);
					}
	    		});
	    	}else{
	    		$scope.posts = data;
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

	$scope.fullscreen = fullscreen;

  })