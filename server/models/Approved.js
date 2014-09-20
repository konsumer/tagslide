var mongoose = require('mongoose');

var Approved = new mongoose.Schema({
	id: {type: String, required:true},
	source: {type: String, enum:['instagram', 'twitter'], required:true}
});

module.exports = mongoose.model('Approved', Approved);