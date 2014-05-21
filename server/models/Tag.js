/**
 * Model that  represents a tag that should be subscribed to
 * @type {Model}
 */
var mongoose = require('mongoose');

var Tag = new mongoose.Schema({
	"tag": {type: String, required: true, unique: true},
	"start": {type: Date, required: true},
	"end": {type: Date, required: true}
});

module.exports = mongoose.model('Tag', Tag);