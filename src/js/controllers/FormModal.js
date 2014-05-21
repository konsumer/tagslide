'use strict';

// DRY utility: make a modal popup, use controller for it
function formModal(name, $modal, object){
  return $modal.open({
    templateUrl: 'views/' + name + '.html',
    controller: 'FormModal',
    resolve: {
      obj: function(){
        return object;
      }
    }
  });
}

// generic controller for C & U of CRUD
angular.module('controllers')
  .controller('FormModal', function ($scope, $rootScope, $modalInstance, $http, $modal, obj) { 
    $scope.obj = obj;

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    }

    $scope.save = function(){
      $modalInstance.close($scope.obj);
    };

    $scope.date = function(){
      
    }
    
  });