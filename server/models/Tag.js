var mongoose = require('mongoose');

var Tag = new mongoose.Schema({
	tag: {type: String, required:true},
	start: Date,
	end: Date
});

module.exports = mongoose.model('Tag', Tag);