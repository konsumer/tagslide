 angular.module('filters')
  .filter('hasTag', function() { return function(posts, tag) {
  	if (posts) return posts.filter(function(p){ return p.tags.indexOf(tag) !== -1; });
  }});