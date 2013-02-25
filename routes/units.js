var Unit = require('../models/unit').Unit;

function transformUnit(unit) {
	return {
		name : unit.name,
		abbreviation : unit.abbreviation,
		plural : unit.plural,
		href : '/api/units/' + unit.name
	}
}

exports.list = function (req, res) {
	Unit.find(function (error, units) {
		if (error) {
			res.send(500, {error: error})
		}
		res.send(units.map(transformUnit));
	});
};

exports.get = function (req, res) {
	Unit.find({name: req.params.name}, function (error, units) {
		if (error) {
			res.send(500, {error: error});
		} else {
			if (units.length == 0) {
				res.send(404);
			} else {
				res.send(200, transformUnit(units[0]));
			}	
		}
	});
};

exports.create = function (req, res) {
	Unit.create(req.body, function (error, unit) {
		if (error) {
			res.send(500, {error : error});
		}
		res.send(201, transformUnit(unit));
	});
};

exports.remove = function (req, res) {
	Unit.remove({name : req.params.name}, function (error, units) {
		if (error) {
			res.send(500, {error: error});
		} else {
			res.send(200);
		}
	});
};