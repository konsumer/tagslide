require('./config');

var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  SessionStore = require('session-mongoose')(express),
  io = require('socket.io').listen(server, { log: process.env.NODE_ENV=='development' })
  path = require('path'),
  mongoose = require('mongoose'),
  Instagram = require('instagram-node-lib'),
  chalk = require('chalk'),
  emoji = require('emoji');

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e){
  console.log(chalk.red('Mongoose Error:'), chalk.white(e))
});

require("mongoose-types").loadTypes(mongoose);

var Post = require('./models/Post'),
  Tag = require('./models/Tag');

Instagram.set('client_id', process.env.INSTAGRAM_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_SECRET);
Instagram.set('maxSockets', 10);

app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret:process.env.SESSION_SECRET,
    store: new SessionStore({
        connection: mongoose.connection
    })
  }));
  app.use(express.static(path.join(__dirname, '..', 'webroot')));
});


// grab recent posts for a tag
function processTag(tag, max_tag_id, cb){
  console.log('collecting posts on Instagram for #' + tag.tag);
  cb = cb || function(){};
  Post.find({tag: tag.tag}, 'id', function(er,p){
    if (er) return cb(er);
    var posts = p.map(function(post){ return post.id; });

    console.log('posts', posts);
    
    var query = { name: tag.tag, error:cb, complete: function(data, pagination){
      data.forEach(function(post){
        console.log('found post', post.id);
        var created_time = post.created_time*1000;
        if(posts.indexOf(post.id) === -1 && created_time > tag.start.valueOf() && created_time < tag.end.valueOf()){
          var newPost = new Post({
            "id": post.id,
            "source": "instagram",
            "tag": tag.tag,
            "type": post.type,
            "media": (post.type == 'image') ? post.images.standard_resolution.url : post.videos.standard_resolution.url,
            "username": post.user.username,
            "user_image": post.user.profile_picture,
            "date": created_time,
            "approved": false,
            "thumbnail": (post.type == 'image') ? post.images.thumbnail.url : post.link + '/media?size=t',
            "link": post.link
          });

          if (post.caption && post.caption.text){
            newPost.caption = emoji.unifiedToHTML(post.caption.text);
          }

          console.log(newPost);

          newPost.save(function(er){
            if (er) return cb(er);
            io.sockets.emit('post', newPost);

            if (pagination && pagination.max_tag_id){
              processTag(tag, pagination.max_tag_id, cb);
            }else{
              cb();
            }
          });
        }else{
          if (pagination && pagination.max_tag_id){
            processTag(tag, pagination.max_tag_id, cb);
          }else{
            cb();
          }
        }
      });
    }};

    if (max_tag_id){
      query.max_tag_id=max_tag_id;
    }

    console.log('query', query);

    Instagram.tags.recent(query);
  });
}


// when Instagram asks us if we cool: we cool.
app.get('/instagram/:tag', function(req, res){
  res.send(req.query['hub.challenge']);
  
  // broken
  //Instagram.subscriptions.handshake(req, res);
});

// Instagram has a new post for us, re-process the tag
app.post('/instagram/:tag', function(req, res){
  res.send(req.query['hub.challenge']);
  console.log('from instagram', req.body);
  /*
  processTag(tag, false,  function(er){
    if (er) console.log('tag error', er)
  });

  */
});

// generate test-tag, 5 days before & after now
// var now = Date.now(); (new Tag({tag:'instagramvideo', start:now-(86400000*5), end: now+(86400000*5)})).save();

// get current posts in each tag-range, up-front
//  Instagram.media.unsubscribe_all();
Tag.find({}, function(er, tags){
  tags.forEach(function(tag){
    var start = tag.start.getSeconds(),
      end = tag.end.getSeconds();

    // tell instagram that we can accept new posts on our callback
    Instagram.subscriptions.subscribe({
      object: 'tag',
      object_id: tag.tag,
      aspect: 'media',
      callback_url: process.env.BASE_URI + 'instagram/' + tag.tag,
      type: 'subscription',
      id: 'tag:' + tag.tag
    });
    
    processTag(tag, false,  function(er){
      if (er) console.log('tag error', er)
    });
  });
});


io.sockets.on('connection', function (Socket) {
  // on connect, give client some tags & posts
  Tag.find({}, function(er,tags){
    if (er) return console.log('error getting tags', er);
    Socket.emit('tags', tags);
  });
  
  Post.find({}, function(er,posts){
    if (er) return console.log('error getting posts', er);
    Socket.emit('posts', posts);
  });

  // WARNING: admin-party

  // client is updating a post
  Socket.on('post', function(post, cb){
    console.log('save', post.id);

    var newPost = {
      approved: post.approved,
      caption: (post.caption && !post.caption.search("</span>")) ? emoji.unifiedToHTML(post.caption) : post.caption,
      date: post.date,
      id: post.id,
      media: post.media,
      source: post.source,
      tag: post.tag,
      type: post.type,
      user_image: post.user_image,
      username: post.username,
      thumbnail: post.thumbnail,
      link: post.link
    };
    
    Post.findOneAndUpdate({id: post.id}, newPost, {upsert: true}, cb);

    Socket.broadcast.emit('post', post);
  });


  // client is updating a tag
  Socket.on('tag', function(tag, cb){
    console.log('save', tag.tag);
    
    Tag.findOneAndUpdate({tag: tag.tag}, {
      tag:tag.tag,
      start:tag.start,
      end:tag.end
    }, {upsert: true}, cb);

    Socket.broadcast.emit('tag', tag);

    processTag(tag, false,  function(er){
      if (er) console.log('tag error', er);
    });
  });

  // client is removing a tag: remove tag & all posts tagged with it, then send new data to all clients, including initiator
  Socket.on('tag/remove', function(tag, cb){
    Tag.findOneAndRemove({tag: tag.tag}, function(er){
      if (er) return cb(er);
      
      Post.remove({tag: tag.tag}, function(er){
        if (er) return cb(er);
        Post.find({}, function(er,posts){
          if (er) return cb(er);
          Socket.emit('posts', posts);
          cb(false,'OK');
        });
      });

      // update client tags
      Tag.find({}, function(er,tags){
        if (er) return console.log('error getting tags', er);
        io.sockets.emit('tags', tags);
      });
    });
  });

});


module.exports.startServer= function(){
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
		console.log(chalk.white('Listening on ') + chalk.blue(chalk.underline('http://0.0.0.0:' + port)));
	});
}

if(require.main === module)
	module.exports.startServer();
