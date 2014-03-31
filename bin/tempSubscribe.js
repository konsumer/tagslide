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


ig.subscriptions({}, function(err, result, limit){
	console.log(result);
});

/*
ig.subscribe_tag('instagramvideo', 'http://tagslide.herokuapp.com/callback/instagram/tag/instagramvideo', {}, function(err, result, limit){
	console.log(result);
});
*/