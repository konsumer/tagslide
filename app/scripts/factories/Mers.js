'use strict';

angular.module('factories')
	.factory('Mers', function ($resource) {
		return function(endpoint){
			function mersTransform(data, headersGetter){
				if (data){
					return JSON.parse(data).payload;
				}
			}
			return $resource(endpoint + '/:id', {}, {
				query: { isArray: true, transformResponse: mersTransform }
			});
		}
	});