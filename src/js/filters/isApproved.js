 angular.module('filters')
  .filter('isApproved', function() { return function(posts) {
  	if (posts) return posts.filter(function(p){ return p.approved; });
  }});