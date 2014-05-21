/**
 * Model that  represents a post that has been approved by an admin
 * @type {Model}
 */
var mongoose = require('mongoose');

var Post = new mongoose.Schema({
	"id": {type: String, required: true, unique: true},
	"source": { type: String, enum: ["twitter", "instagram"], required:true },
	"tag": {type: String, required: true},
	"type": { type: String, enum: ["video", "image"], required:true },
	"media": {type: mongoose.SchemaTypes.Url, required: true},
	"username": {type: String, required: true},
	"user_image": {type: mongoose.SchemaTypes.Url, required: true},
	"caption": {type: String},
	"date": {type: Date, required: true},
	"approved": Boolean,
	"thumbnail": {type: mongoose.SchemaTypes.Url, required: true},
	"link": {type: mongoose.SchemaTypes.Url, required: true}
});

module.exports = mongoose.model('Post', Post);