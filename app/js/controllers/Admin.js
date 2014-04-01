'use strict';

angular.module('controllers')
  .controller('Admin', function ($scope, $sce, $modal, Tag, Post) {
	function updateTags(){
		Tag.query({}, function(tags){
			$scope.tags = tags;
		});
	}
	updateTags();

	function updatePosts(){
	    Post.query({}, function(posts){
			$scope.posts = posts;
		});
	}
	updatePosts();

  	$scope.deleteTag = function(tag){
		if(confirm('Are you sure you want to delete "' + tag.tag + '"? All posts that are tagged with this will also be deleted.')){
			Tag.remove({tag:tag['_id']}, updateTags);
		}  		
  	}

  	$scope.approve = function(post){
  		var p = Post.get({'post': post['_id']}, function(){
  			p.approved = post.approved;
  			p.$save(updatePosts);
  		})
  	}

  	$scope.form = function(object){
  		formModal('tag', $modal, object, function(obj){

  		});
  	}
  });