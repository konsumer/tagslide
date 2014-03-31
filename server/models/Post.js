/**
 * A post that has been tagged, with an image or video
 * @type {mongoose.Model}
 */

var mongoose = require('mongoose'),
	mongooseTypes = require("mongoose-types"),
	Tag = require('./Tag'),
	instagram = require('instagram-node').instagram();

mongooseTypes.loadTypes(mongoose);

var Post = new mongoose.Schema({
	"id": {type: String, required: true},
	"media": {type: mongoose.SchemaTypes.Url, required:true},
	"user": {type: String, required: true},
	"user_img": {type: mongoose.SchemaTypes.Url, required:true},
	"tags": [String],
	"type": { type: String, enum: ["video", "image"], required:true },
	"source": { type: String, enum: ["twitter", "instagram"], required:true },
	"created": {type: Date, required: true},
	"saved": { type: Date, default: Date.now },
	"caption": String,
	"approved": { type: Boolean, default: false }
});

// allows serachbytag: /rest/post/finder/tag/:tag
// gets only approved Posts
Post.statics.tag = function(q, tag){
	q.tags = tag || q.tags;
	q.approved = true;
	return this.find(q);
}

// collect all old posts for a tag (for pre-realtime monitoring)
Post.statics.igCollectArchive = function(tag, cb){

}

module.exports = mongoose.model('Post', Post);