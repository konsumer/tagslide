'use strict';

angular.module('tagslide')
  .controller('Admin', function ($scope, $resource) {
  	$scope.Tag = $resource('/rest/admin/tags/:tag', {tag:'@id'});
  	$scope.Post = $resource('/rest/admin/posts/:post', {post:'@id'});



  })