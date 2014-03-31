/**
 * Command-line tester to get posts
 */

var mongoose = require('mongoose'),
	async = require('async'),
	env = require('node-env-file'),
	Post = require('../server/models/Post')
	Tag = require('../server/models/Tag'),
	instagram = require('instagram-node').instagram();;

// TODO: callback URLs for all tags: http://instagram.com/developer/realtime/


// get setting like foreman does
env(__dirname + '/../.env');

if (!process.env.MONGOLAB_URI){
	console.log('Please set the environment variable MONGOLAB_URI.');
}

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
	console.log('Mongoose Error:', e)
});

if (!process.env.INSTAGRAM_ID || !process.env.INSTAGRAM_SECRET){
	console.log('Please set the environment variables INSTAGRAM_ID & INSTAGRAM_SECRET.');
}

instagram.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });

/**
 * Given a tag, find all instagram posts with that tag and save them
 * @param  {Object}   info Single Tag record from database
 * @param  {Function} cb  [description]
 */
function lookupInstagramTag(info, cb){
	var records = [];

	var min_timestamp=Math.floor(info.start.getTime()/1000),
		max_timestamp=Math.floor(info.end.getTime()/1000);

	console.log('"' + info.tag + '" - range: ' + min_timestamp + ' - ' + max_timestamp)

	// get a list of all approved posts
	
	Post.find({approved:true, source:'instagram'}, 'id', function(er, apr){
		var approved = apr.map(function(a){ return a.id; });
		console.log('remebering approval:', approved);
		Post.remove({tags: info.tag, source:'instagram'}, function(err){
			if (err) return cb(err);

			var hdl = function(err, result, pagination, limit) {
				if (err) return cb(err);

				var ids = result.map(function(r){ return r.id; });
				records.concat(ids);

				var inRange = result.filter(function(record){ return (record.created_time < max_timestamp && record.created_time > min_timestamp); });
				if (inRange.length<1){
					return cb('no records in current page within date-range');
				}

				async.map(result, function(record, cb){
					console.log(record.id, record.tags.indexOf(info.tag), record.created_time, record.created_time < max_timestamp && record.created_time > min_timestamp);

					if ( (record.tags.indexOf(info.tag) !== -1)&& record.created_time < max_timestamp && record.created_time > min_timestamp){
						var post = new Post({
							created: new Date(record.created_time*1000),
							source: 'instagram',
							approved: (approved.indexOf(record.id) !== -1),
							id: record.id,
							type: record.type,
							user: record.user.username,
							user_img: record.user.profile_picture,
							tags: record.tags,
							media: (record.type=='video') ? record.videos.standard_resolution.url : record.images.standard_resolution.url
						});
						
						if (record.caption && record.caption.text){
							post.caption=record.caption.text;
						}

						post.save(cb);
					}else{
						cb();
					}
				}, function(err, savedRecords){
					if(pagination.next) {
						pagination.next(hdl);
					}else{
						cb(undefined, records)
					}
				});
			};

			// Aargh!
			// min/max don't seem to be working.
			// also, not all posts actually have the tag, so I test in my code
			instagram.tag_media_recent(info.tag, {
				min_timestamp:min_timestamp,
				max_timestamp:max_timestamp
			}, hdl);
		});
	});
}

// get all tags from database
Tag.find({}, function(er, tags){
	async.map(tags, lookupInstagramTag, function(err, results){
		mongoose.connection.close();
	});
});