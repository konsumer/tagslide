var mongoose = require("mongoose"),
    chalk = require('chalk');

// pre-configure mongoose
var mongo_url = process.env.MONGO_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL;

if (mongo_url){
	mongoose.connect(mongo_url, {auto_reconnect: true});
}

mongoose.connection.on('error', function(e) {
    console.log(chalk.red('Mongoose Error:'), e)
});

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        module.exports[name] = require('./' + file);
    }
});
