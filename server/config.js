/**
 * Make sure all your settings are correct
 */

var mongoose = require("mongoose"),
	chalk = require('chalk'),
	Instagram = require('instagram-node-lib');

// load .env file, if we are not on heroku
if(!process.env.BASE_URI){
	var env = require('node-env-file');
	try{
		env('.env');
	}catch(e){
		complainAndDie('Missing .env file. Please read README.md for more information.');
	}
}

// check config
if (!process.env.BASE_URI)
	complainAndDie('Please set the environment variable BASE_URI to an externally-facing host for your webroot.');
if (!process.env.TAG)
	complainAndDie('Please set the environment variable TAG to the hashtag you want to listen for.');
if (!process.env.INSTAGRAM_ID)
	complainAndDie('Please set the environment variable INSTAGRAM_ID to your Instagram ID.');
if (!process.env.INSTAGRAM_SECRET)
	complainAndDie('Please set the environment variable INSTAGRAM_SECRET to your Instagram secret.');

// external interface
module.exports = {
	comments: stringToBoolean(process.env.COMMENTS),
	moderated: stringToBoolean(process.env.MODERATED),
	tag: process.env.TAG,
	base_uri: process.env.BASE_URI,
	port: process.env.PORT || 8000,
	interval: process.env.INTERVAL || 10000
};

function complainAndDie(msg){
	console.log(chalk.red('Error: ') + msg);
	process.exit(1);
}

// this will handle 1=TRUE=yes=YES=true & 0=FALSE=no=NO=false
function stringToBoolean(string){
	var out = false;
	if (string)
		out = Boolean(JSON.parse(string.toLowerCase().replace('no','false').replace('yes','true')))
	return out;
}

// pre-configure Instagram
Instagram.set('client_id', process.env.INSTAGRAM_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_SECRET);



