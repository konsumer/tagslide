var express = require('express.io'),
	app = express(),
	config = require('./config'),
	chalk = require('chalk');

// setup webserver

app.http().io();
app.use(express.static(__dirname + '/../client'));

// load services
app.posts = [];
app.current = 0;
var instagram = require('./instagram')(app);
// require('./twitter')(app);


console.log('Listening at ' + chalk.blue(chalk.underline('http://0.0.0.0:' + config.port)));
app.listen(config.port);

var update = function(){
	console.log('update!');
	if (app.posts.length > 0){
		app.io.broadcast('post', app.posts[app.current % app.posts.length]);
		app.current++;
	}
};
update();

// tell all clients to update, together
setInterval(update, config.interval);

app.io.route('ready', function(req) {
	req.io.emit('post', app.posts[(app.current-1) % app.posts.length]);
});