'use strict';

angular.module('controllers')
.controller('AdminCtrl', function ($scope, $rootScope, $modal, $timeout, App, Socket) {
	$scope.app = $rootScope.app;

	$scope.alerts = [];

	function savePost(post){
		Socket.emit('post', post, function(err){
			if (err){
				addAlert(err.message, 'danger');
			}else{
				if (post.approved){
					addAlert('post approved.', 'success');
				}else{
					addAlert('post unapproved.', 'success');
				}
			}
		});
	}

	$scope.approve = function(post){
		post.approved = true;
		savePost(post);
	}

	$scope.disapprove = function(post){
		post.approved = false;
		savePost(post);
	}

	$scope.deleteTag = function(tag){
		if (confirm('Are you sure you want to delete #' + tag.tag + ', and all posts associated with it?')){
			Socket.emit('tag/remove', tag, function(err){
				if (err){
					addAlert(err.message, 'danger');
				}else{
					addAlert('tag removed.', 'success');
				}
			});
		}
	}

	$scope.tagForm = function(tag){
		var modalInstance = $modal.open({
	      templateUrl: 'views/tagForm.html',
	      controller: ModalInstanceCtrl,
	      resolve: {
	        thing: function () {
	          return tag;
	        }
	      }
	    });

	    modalInstance.result.then(function (tag) {
	    	Socket.emit('tag', tag, function(err){
				if (err){
					addAlert(err.message, 'danger');
				}else{
					addAlert('tag saved.', 'success');
				}
			});
	    });
	}

	/**
	 * Action for close button of Alert
	 * @param  {Number} index   The index of the window
	 */
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	/**
	 * Add an alert message that will remove itself
	 * @param {String} msg    Your message
	 * @param {String} type   'success', 'info', 'warning', 'danger'
	 */
	var hideTimeout;
	function addAlert(msg, type){
		type = type || 'info';
		var l = $scope.alerts.length +0;
		$scope.alerts.push({type:type, msg:msg});
		if (hideTimeout) $timeout.cancel( hideTimeout );
		hideTimeout=$timeout(function(){ $scope.alerts=[]; }, 3000);
	}
});

var ModalInstanceCtrl = function ($scope, $modalInstance, thing) {
  $scope.thing = thing;

  $scope.ok = function () {
    $modalInstance.close($scope.thing);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
