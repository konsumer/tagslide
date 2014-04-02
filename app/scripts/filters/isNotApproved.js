 angular.module('filters')
  .filter('isNotApproved', function() { return function(posts, okPosts) {
  	if (posts) {
  		return posts.filter(function(p){
	  		return (okPosts.indexOf(p.id) === -1);
	  	});
	}
  }});