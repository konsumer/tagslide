require('./config');

var express = require('express'),
	mongoose = require('mongoose'),
	Post = require('./models/Post'),
	Tag = require('./models/Tag'),
	chalk = require('chalk'),
	mers = require('mers');

var app = express();
app.use(express.compress());

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
	console.log('Mongoose Error:', e)
});

app.use(express.errorHandler({
	dumpExceptions: true,
	showStack: true
}));
app.use(express.logger('dev')); 

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);

app.use('/', express.static('webroot'));

// TODO: require auth on all but /rest/post/finder/tag/:tag
// https://github.com/jspears/mers/issues/25

// TODO: delete all posts in a tag when tag is deleted

app.use('/rest', mers({mongoose:mongoose}).rest());

// instagram realtime API
// TODO: save records and inform clients somehow,  maybe socket.io?

app.all('/callback/instagram/tag/:tag', function(req, res){
	res.send(req.query['hub.challenge']);
	console.log(req.body);
});


module.exports.startServer= function(){
	var port = Number(process.env.PORT || 5000);
	app.listen(port, function() {
		console.log(chalk.white('Listening on ') + chalk.blue(chalk.underline('http://0.0.0.0:' + port)));
	});
}

if(require.main === module)
	module.exports.startServer();
