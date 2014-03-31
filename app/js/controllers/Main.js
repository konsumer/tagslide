'use strict';

angular.module('tagslide')
  .controller('Main', function ($scope, $resource, $interval, $sce) {
    $scope.tag = 'instagramvideo';

    var Post = $resource('/rest/post/finder/tag/:tag', {tag:'@id'}, {query:{transformResponse:function(data, headersGetter){
      return data.payload;
    }}});

    Post.query({tag:'instagramvideo'});

    /*
  	// upate slides every 30 seconds
  	function update(){
  		$http.get('/rest/posts/' + $scope.tag).success(function(posts){
        posts=posts.map(function(m){
          m.media = $sce.trustAsResourceUrl(m.media);
          m.user_img = $sce.trustAsResourceUrl(m.user_img);
          return m; 
        });
        $scope.posts = posts;
      });
  	}

  	$interval(update, 30000);
  	update();
    */
  })