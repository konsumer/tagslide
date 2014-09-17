var app = require('express.io')(),
	Instagram = require('instagram-node-lib'),
	chalk = require('chalk'),
	_ = require('lodash'),
	posts = [],
	current = 0;

function complainAndDie(msg){
	console.log(chalk.red('Error: ') + msg);
	process.exit(1);
}

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
	complainAndDie('Please set the environment variable INSTAGRAM_ID toy our Instagram ID.');
if (!process.env.INSTAGRAM_SECRET)
	complainAndDie('Please set the environment variable INSTAGRAM_SECRET to your Instagram secret.');

Instagram.set('client_id', process.env.INSTAGRAM_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_SECRET);

// turn Instagram post into normalized post & add to posts, if it's not already recorded
function processInstagram(post){
	var record = _.filter(posts, { 'id': post.id, source: 'instagram'});
	if (record.length !== 0) return;
	post.source = 'instagram';
	posts.push({
		"id": post.id,
		"source": "instagram",
		"tag": process.env.TAG,
		"type": post.type,
		"media": (post.type == 'image') ? post.images.standard_resolution.url : post.videos.standard_resolution.url,
		"username": post.user.username,
		"user_image": post.user.profile_picture,
		"thumbnail": (post.type == 'image') ? post.images.thumbnail.url : post.link + '/media?size=t',
		"link": post.link,
		"caption": post.caption.text
	});
	console.log(post.caption)
}

app.http().io();

// when Instagram asks us if we cool: we cool.
app.get('/instagram/:tag', function(req, res){
  res.send(req.query['hub.challenge']);
});

// Instagram has a new post for us, re-process the tag
app.post('/instagram/' + process.env.TAG, function(req, res){
	res.send(req.query['hub.challenge']);
	Instagram.tags.recent({
		name: process.env.TAG,
		complete: function(data){
			data.forEach(processInstagram);
		}
	});
});

// subscribe to Instagram's new posts
Instagram.subscriptions.subscribe({
	object: 'tag',
	object_id: process.env.TAG,
	aspect: 'media',
	callback_url: process.env.BASE_URI + 'instagram/' + process.env.TAG,
	type: 'subscription',
	id: 'tag:' + process.env.TAG
});

// get initial Instagram posts
Instagram.tags.recent({
	name: process.env.TAG,
	complete: function(data){
		data.forEach(processInstagram);
	}
});

// server client HTML
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html');
});

// tell all clients to update, together
setInterval(function(){
	if (posts.length > 0){
		app.io.broadcast('post', posts[current % posts.length]);
		current++;
	}
}, process.env.INTERVAL || 3000);

app.io.route('ready', function(req) {
    app.io.broadcast('post', posts[current % posts.length]);
})

var port = process.env.PORT || 8000;
console.log('Listening at ' + chalk.blue(chalk.underline('http://0.0.0.0:' + port)));
app.listen(port);