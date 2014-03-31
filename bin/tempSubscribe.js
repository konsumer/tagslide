/**
 * temp tool until post admin is made
 */

var env = require('node-env-file'),
	ig = require('instagram-node').instagram();;

// get setting like foreman does
env(__dirname + '/../.env');


ig.use({
  client_id: process.env.INSTAGRAM_ID,
  client_secret: process.env.INSTAGRAM_SECRET
});



ig.subscribe_tag('funny', 'http://tagslide.herokuapp.com/callback/instagram/tag/funny', {}, function(err, result, limit){
	console.log(result);
});

ig.subscribe_user('http://tagslide.herokuapp.com/callback/instagram/user', {}, function(err, result, limit){
	console.log(result);
});

ig.subscribe_location(1257285, 'http://tagslide.herokuapp.com/callback/instagram/location/1257285', {}, function(err, result, limit){
	console.log(result);
});
