/**
 * temp tool until post admin is made
 */

var mongoose = require('mongoose'),
	async = require('async'),
	env = require('node-env-file'),
	Post = require('../server/models/Post')
	Tag = require('../server/models/Tag'),
	instagram = require('instagram-node').instagram();;

// get setting like foreman does
env(__dirname + '/../.env');

if (!process.env.MONGOLAB_URI){
	console.log('Please set the environment variable MONGOLAB_URI.');
}

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
	console.log('Mongoose Error:', e)
});

if (!process.env.INSTAGRAM_ID || !process.env.INSTAGRAM_SECRET){
	console.log('Please set the environment variables INSTAGRAM_ID & INSTAGRAM_SECRET.');
}

instagram.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });

// this uses changes from https://github.com/teleportd/instagram-node/issues/21
instagram.subscribe_tag('tagslide', 'http://tagslide.herokuapp.com/callback/instagram/tag/tagslide', {}, function(er, results){
	console.log(er, results);
	mongoose.connection.close();
});
