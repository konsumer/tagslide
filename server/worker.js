var express = require('express'),
	mongoose = require('mongoose'),
	Post = require('./models/Post.js'),
	Tag = require('./models/Tag.js'),
	mers = require('mers');

var app = express();
app.use(express.compress());

if (!process.env.MONGOLAB_URI){
	console.log('Please set the environment variable MONGOLAB_URI.');
	process.exit(1);
}

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
	console.log('Mongoose Error:', e)
});

app.use(express.errorHandler({
	dumpExceptions: true,
	showStack: true
}));
app.use(express.logger('dev')); 

app.use(express.favicon('app/favicon.ico'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);

app.use('/', express.static('app'));

app.get('/admin', function(req, res){
	res.sendfile('app/admin.html');
});

// TODO: require auth on all but /rest/post/finder/tag/:tag
app.use('/rest', mers({mongoose:mongoose}).rest());

// instagram realtime API

app.all('/callback/instagram/tag/:tag', function(req, res){
	res.send(req.query['hub.challenge']);
	console.log(req.body);
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log('Listening on ' + port);
});

module.exports = app;
