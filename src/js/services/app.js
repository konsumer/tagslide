/**
 * Service for tags & posts
 */
angular.module('services')
.service( 'App', function(Socket){
	return function() {
	  	var self = this;
	  	self.posts = [];
	  	self.approved=[];
		self.tags = [];

	    // a new post came in, check for existance & approval
	    Socket.on('post', function(post){
	    	var i = _.findIndex(self.posts, {id: post.id});
	    	if (i === -1){
	    		self.posts.push(post);
	    	}else{
	    		self.posts[i].approved = post.approved;
	    	}

	    	self.approved = self.posts.filter(function(p){
	    		return p.approved;
	    	}).map(function(p){
	    		return p.id;
	    	});
	    });

	    // a new tag came in
	    Socket.on('tag', function(tag){
	    	if (_.findIndex(self.tags, {tag: tag.tag}) === -1){
	    		self.tags.push(tag);
	    	}
	    });

	    // set all posts at once
	    Socket.on('posts', function(posts){
	    	self.posts = posts;
			self.approved = self.posts.filter(function(p){
	    		return p.approved;
	    	}).map(function(p){
	    		return p.id;
	    	});
	    });

	    // set all tags at once
	    Socket.on('tags', function(tags){
	    	self.tags = tags;
	    });
	}
});