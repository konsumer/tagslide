'use strict';

angular.module('tagslide')
  .controller('Main', function ($scope, $resource, $interval, $sce) {
    $scope.tag = 'instagramvideo';

    var Post = $resource('/rest/post/finder/tag/:tag');

    Post.get({tag:'instagramvideo'},function(data){
    	var posts = data.payload.map(function(p){
    		p.media = $sce.trustAsResourceUrl(p.media);
    		p.user_img = $sce.trustAsResourceUrl(p.user_img);
    		return p;
    	});
    	$scope.posts = posts;
    });

  })