angular.module('services')
.service( 'Tag', function($resource){
	return $resource('/rest/tag/:tag', {}, {
		query: {
			isArray: true,
			transformResponse: function(data, headersGetter){
				if (data){
					return JSON.parse(data).payload;
				}
			}
		}
	});
});