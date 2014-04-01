angular.module('services')
.service( 'Post', function($resource, $sce){
	return $resource('/rest/post/:post', {}, {
		findByTag: {url: '/rest/post/finder/tag/:tag'},
		query: {
			isArray: true,
			transformResponse: function(data, headersGetter){
				if (data){
					return JSON.parse(data).payload.map(function(p){
						p.media=$sce.trustAsResourceUrl(p.media);
						p.user_img=$sce.trustAsResourceUrl(p.user_img);
						return p;
					});
				}
			}
		}
	});
});