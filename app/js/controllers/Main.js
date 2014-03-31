'use strict';

angular.module('tagslide')
  .controller('Main', function ($scope, $resource, $interval, $sce) {
    $scope.tag = 'instagramvideo';

    var Post = $resource('/rest/post/finder/tag/:tag', {tag:'@id'}, {query:{transformResponse:function(data, headersGetter){
      return data.payload;
    }}});

    Post.query({tag:'instagramvideo'});
  })