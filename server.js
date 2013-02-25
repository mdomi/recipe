var express = require('express'),
	mongoose = require('mongoose'),
	recipes = require('./routes/recipe'),
	units = require('./routes/units'),
	app = express();

mongoose.connect('localhost', 'recipe');

app.configure(function () {
	app.use(express.bodyParser());
});

app.get('/api/units', units.list);
app.get('/api/units/:name', units.get);
app.post('/api/units', units.create);
app.delete('/api/units/:name', units.remove);

app.get('/api/recipes', recipes.list);
app.get('/api/recipes/:id', recipes.get);
app.put('/api/recipes/:id', recipes.update);
app.post('/api/recipes', recipes.create);

app.listen(3000);