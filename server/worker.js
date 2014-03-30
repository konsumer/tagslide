var express = require('express'),
	mongoose = require('mongoose');

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

app.use(express.favicon('app/favicon.ico'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);

app.use('/', express.static('app'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log('Listening on ' + port);
});

module.exports = app;
