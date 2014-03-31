/**
 * temp tool until tag admin is made
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

// posts from last week
var now = (new Date()).getTime();
var weekAgo = now-6.048e+8;

var tag = new Tag({tag: 'instagramvideo', start:weekAgo, end:now});
tag.save(function(){
	mongoose.connection.close();
});