/**
 * Model that  represents a post that has been approved by an admin
 * @type {Model}
 */
var mongoose = require('mongoose');

var Post = new mongoose.Schema({
	"id": {type: String, required: true},
	"source": { type: String, enum: ["twitter", "instagram"], required:true }
});

module.exports = mongoose.model('Post', Post);