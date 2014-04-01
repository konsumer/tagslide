var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server)
	path = require('path'),
	mongoose = require('mongoose'),
	Post =require('./models/Post'),
	Tag =require('./models/Tag');

var port = Number(process.env.PORT || 5000);
server.listen(port);

if (!process.env.MONGOLAB_URI){
	console.log('Please set the environment variable MONGOLAB_URI.');
	process.exit(1);
}

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
	console.log('Mongoose Error:', e)
});


app.use(express.static(path.join(__dirname, 'app')));

io.sockets.on('connection', function (socket) {
	// give them a list of tags, initially
	Tag.find({}, function(er, tags){
		tags.forEach(function(tag){ socket.emit('tag:add', tag.tag); });
	});

});