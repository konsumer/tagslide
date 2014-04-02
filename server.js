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
	// give them a list of tags & OK'd posts, initially
	Tag.find({}, function(er, tags){
		tags.forEach(function(tag){
			socket.emit('/tag/add', tag.tag);
			Post.find({tag:tag.tag}, function(er, posts){
				posts.forEach(function(post){
					post.sourceTag = tag.tag;
					socket.emit('/post/add', post);
				});
			});
		});
	});

	// TODO: disable admin party

	// OK a post in admin
	socket.on('/post/add', function (post, fn) {
		var p = new Post({source:post.source, source_id:post.id, tag:post.sourceTag});
		p.save(function(err){
			if (!err){
				socket.broadcast.emit('/post/add', p);
			}
			fn({error:err, record:p});
		});
	});

	// de-OK a post in admin
	socket.on('/post/remove', function (post, fn) {
		Post.findOneAndRemove({source: post.source, source_id: post.id}, function(err, p){
			if(!err){
				socket.broadcast.emit('/post/remove', p);
			}
			fn({error:err, record:p});
		});
	});

	// tag added in admin
	socket.on('/post/add', function (post, fn) {
		// add subscription for instagram
		// add record in db
		// send broadcast
	});

	// tag removed in admin
	socket.on('/post/remove', function (post, fn) {
		// remove subscription for instagram
		// remove record in db
		// send broadcast
	});
});