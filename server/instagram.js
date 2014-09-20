/**
 * Handle all Instagram stuff
 */

var Instagram = require('instagram-node-lib'),
	_ = require('lodash'),
	config = require('./config'),
	models = require('./models');

module.exports = function(app){
	var approved =[];

	// turn Instagram post into normalized post & add to posts, if it's not already recorded
	var process = function(post){
		console.log('instagram ' + post.id);
		if (config.moderated && approved.indexOf(post.id) === -1) return console.log('not approved.');
		var record = _.filter(app.posts, { 'id': post.id, source: 'instagram'});
		if (record.length !== 0) return;

		record = {
			"id": post.id,
			"source": "instagram",
			"tag": config.tag,
			"type": post.type,
			"media": (post.type == 'image') ? post.images.standard_resolution.url : post.videos.standard_resolution.url,
			"username": post.user.username,
			"user_image": post.user.profile_picture,
			"thumbnail": (post.type == 'image') ? post.images.thumbnail.url : post.link + '/media?size=t',
			"link": post.link,
			"caption": post.caption.text
		};

		if (config.comments && post.comments.count){
			record.comments = post.comments.data;
		}

		app.posts.push(record);
	};

	// update approved posts
	var updateApproved = function(cb){
		if (config.moderated){
			models.Approved.find({source:'instagram'}, function(err, appr){
				if (err) return cb(err);
				approved = appr.map(function(a){ return a.id; });
				cb(null, approved);
			});
		}else{
			cb(null);
		}
	}

	// when Instagram asks us if we cool: we cool.
	app.get('/instagram/' + config.tag, function(req, res){
		res.send(req.query['hub.challenge']);
	});

	// Instagram has a new post for us, re-process the tag
	app.post('/instagram/' + config.tag, function(req, res){
		res.send(req.query['hub.challenge']);
		
		updateApproved(function(err, appr){
			if (err) return;
			Instagram.tags.recent({
				name: config.tag,
				complete: function(data){
					data.forEach(process);
				}
			});
		});
	});

	// get initial Instagram posts
	Instagram.tags.recent({
		name: config.tag,
		complete: function(data){
			updateApproved(function(err, appr){
				if (err) return;
				data.forEach(process);
			});
		}
	});

	// subscribe to Instagram's new posts
	Instagram.subscriptions.subscribe({
		object: 'tag',
		object_id: config.tag,
		aspect: 'media',
		callback_url: config.base_uri + 'instagram/' + config.tag,
		type: 'subscription',
		id: 'tag:' + config.tag
	});
}