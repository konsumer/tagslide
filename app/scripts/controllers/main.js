'use strict';

angular.module('controllers')
.controller('MainCtrl', function ($scope, Mers) {
	var Post = Mers('/rest/post');

	Post.query();
});
