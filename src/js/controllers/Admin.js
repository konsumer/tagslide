'use strict';

angular.module('controllers')
  .controller('Admin', function ($scope, $sce, $modal, Tag, Post, $interval) {
	function updateTags(){
		Tag.query({}, function(tags){
			$scope.tags = tags;
		});
	}
	updateTags();

	function updatePosts(){
	    Post.findByTag({tag:'instagramvideo'},function(data){
	    	if ($scope.posts){
	    		var ids = $scope.posts.map(function(p){ return p.id; });
	    		data.forEach(function(p){
					if (ids.indexOf(p.id) === -1){
						$scope.posts.push(p);
					}
	    		});
	    	}else{
	    		$scope.posts = data;
	    	}
	    });
	}
	$interval(updatePosts, 30000);
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
  		formModal('tag', $modal, object)
	  		.result.then(function (newT) {
	  			function saveTag(tag){
  					tag.tag = newT.tag;
	  				tag.start = newT.start;
	  				tag.end = newT.end;
	  				tag.$save(function(er){
	  					console.log(er);
	  				});
	  			}
	  			if (newT['_id']){
		  			Tag.get({tag:newT['_id']}, saveTag);
		  		}else{
		  			saveTag(new Tag());
		  		}
		    });
  	}
  });