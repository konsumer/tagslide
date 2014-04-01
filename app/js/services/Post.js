angular.module('services')
.service( 'Post', function($resource, $sce){
	function mersTransform(data, headersGetter){
		if (data){
			return JSON.parse(data).payload.map(function(p){
				p.media=$sce.trustAsResourceUrl(p.media);
				p.user_img=$sce.trustAsResourceUrl(p.user_img);
				return p;
			});
		}
	}

	return $resource('/rest/post/:post', {}, {
		findByTag: { url: '/rest/post/finder/tag/:tag', isArray: true, transformResponse: mersTransform },
		query: { isArray: true, transformResponse: mersTransform }
	});
});