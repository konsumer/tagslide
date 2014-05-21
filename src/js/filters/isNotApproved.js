 angular.module('filters')
  .filter('isNotApproved', function() { return function(posts) {
  	if (posts) return posts.filter(function(p){ return !p.approved; });
  }});