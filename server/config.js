/**
 * load settings into process.env & ensure configuration requires all required values
 */

var chalk = require('chalk');

function complainAndDie(msg){
	console.log(chalk.red('Error: ') + chalk.white(msg));
	process.exit(1);
}

// load .env file, if we are not in foreman
if(!process.env.BASE_URI){
	var env = require('node-env-file');
	try{
		env('.env');
	}catch(e){
		complainAndDie('Missing .env file. Please read README.md for more information.');
	}
}

if (!process.env.BASE_URI)
	complainAndDie('Please set the environment variable BASE_URI to an externally-facing host for your webroot.');

if (!process.env.MONGO_URI && !process.env.MONGOLAB_URI)
	complainAndDie('Please set the environment variable MONGO_URI or MONGOLAB_URI.');

if (!process.env.SESSION_SECRET)
	complainAndDie('Please set the environment variable SESSION_SECRET to some random text.');

if (!process.env.INSTAGRAM_ID)
	complainAndDie('Please set the environment variable INSTAGRAM_ID toyour Instagram ID.');

if (!process.env.INSTAGRAM_SECRET)
	complainAndDie('Please set the environment variable INSTAGRAM_ID toyour Instagram secret.');


