angular.module('factories')
.factory('instagram', function($http){
	var base = "https://api.instagram.com/v1";
	// get your own client id http://instagram.com/developer/
	var clientId = 'e00b26d1c7d04ed49d535398b6b2d592';
	return {
		'get': function(hashtag, count) {
			count = count || 100;
			var request = '/tags/' + hashtag + '/media/recent';
			var url = base + request;
			var config = {
				'params': {
					'client_id': clientId,
					'count': count,
					'callback': 'JSON_CALLBACK'
				}
			};
			return $http.jsonp(url, config);
		}
	};

});