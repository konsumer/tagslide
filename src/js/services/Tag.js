angular.module('services')
.service( 'Tag', function($resource){
	function mersTransform(data, headersGetter){
		if (data){
			return JSON.parse(data).payload;
		}
	}

	return $resource('/rest/tag/:tag', {}, {
		query: { isArray: true, 	transformResponse: mersTransform }
	});
});