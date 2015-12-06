var purchased = require('./models/todo');
//var purchased = require('./models/purchased');


function getPurchased(res){
	purchased.find(function(err, purchased) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(purchased); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/purchased', function(req, res) {

		// use mongoose to get all todos in the database
		getPurchased(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/purchased', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		purchased.create({
			text : req.body.text,
			amount: req.body.amount,
			createdDate:req.body.date
			
		}, function(err, purchased) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getPurchased(res);
		});

	});

	// delete a todo
	app.delete('/api/purchased/:purchased_id', function(req, res) {
		purchased.remove({
			_id : req.params.purchased_id
		}, function(err, purchased) {
			if (err)
				res.send(err);

			getPurchased(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};