var _ = require('underscore'),
	Recipe = require('../models/recipe').Recipe,
	Unit = require('../models/ingredient').Unit;

var defaults = {
	short : true
};

function transformRecipe(recipe, options) {
	var transformedRecipe = {
		id : recipe._id,
		name : recipe.name,
		href : '/api/recipes/' + recipe._id
	};

	options = _.extend({}, defaults, options);

	if (!options.short) {
		transformedRecipe = _.extend(transformedRecipe, {
			instructions : recipe.instructions,
			ingredients : recipe.ingredients
		});
	}

	return transformedRecipe;
}

exports.list = function (req, res) {
	Recipe.find(function (error, recipes) {
		if (error) {
			res.send(500, {error : error});
		} else {
			res.send(200, recipes.map(function (recipe) {
				return transformRecipe(recipe);
			}));
		}
	});
};

exports.get = function (req, res) {
	Recipe.find({_id: req.params.id}, function (error, recipes) {
		if (error) {
			res.send(500, {error: error});
		} else {
			if (recipes.length === 0) {
				res.send(404);
			} else {
				res.send(200, transformRecipe(recipes[0], {
					short : false
				}));
			}	
		}
	});
};

exports.update = function (req, res) {
	Recipe.findByIdAndUpdate(req.params.id, req.body, function (error, recipe) {
		var recipe;
		if (error) {
			res.send(500, {error : error});
		} else {
			res.send(200, transformRecipe(recipe, {
				short : false
			}));
		}
	});
};

exports.create = function (req, res) {
	Recipe.create({
		name : req.body.name,
		instructions : req.body.instructions,
		ingredients : req.body.ingredients
	}, function (error, recipe) {
		if (error) {
			res.send(500, {error : error});
		}
		res.send(201, transformRecipe(recipe));
	});
};