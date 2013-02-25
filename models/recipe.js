var mongoose = require('mongoose'),
	IngredientSchema = require('./ingredient').IngredientSchema;

exports.RecipeSchema = mongoose.Schema({
	name : String,
	instructions : String,
	ingredients : [IngredientSchema]
});

exports.Recipe = mongoose.model('Recipe', exports.RecipeSchema);