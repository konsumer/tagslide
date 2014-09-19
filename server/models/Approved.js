var mongoose = require('mongoose');

var Approved = new mongoose.Schema({
	id: String,
	source: {type: String, enum:['instagram', 'twitter']}
});

module.exports = mongoose.model('Song', Approved);