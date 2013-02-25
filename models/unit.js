var mongoose = require('mongoose');

exports.UnitSchema = mongoose.Schema({
	name : String,
	abbreviation : String,
	plural : String
});

exports.Unit = mongoose.model('Unit', exports.UnitSchema);
