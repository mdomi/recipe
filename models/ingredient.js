var mongoose = require('mongoose');

exports.IngredientSchema = mongoose.Schema({
	unit : String,
	amount : Number,
	name : String
});

exports.Ingredient = mongoose.model('Ingredient', exports.IngredientSchema);
