'use strict';

// DRY utility: make a modal popup, use controller for it
function formModal(name, $modal, object, saver){
  return $modal.open({
    templateUrl: 'views/' + name + '.html',
    controller: 'FormModal',
    resolve: {
      obj: function(){
        return object;
      },
      saver: function(){
        return saver;
      }
    }
  });
}

// generic controller for C & U of CRUD
angular.module('controllers')
  .controller('FormModal', function ($scope, $rootScope, $modalInstance, $http, $modal, obj, saver) { 
    $scope.obj = obj;

    $scope.cancel = function(){

    }

    $scope.save = saver;

  });