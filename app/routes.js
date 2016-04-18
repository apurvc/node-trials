var fs = require('fs');
var Todo = require('./model/todo').Todo;

module.exports = function (router) {

	// middleware to use for all requests
	router.use(function (req, res, next) {
		// do logging
		console.log('Something is happening. '+ req.baseUrl);
		console.log('Body: '+ req.body);
		next(); // make sure we go to the next routes and don't stop here
	});

	router.get('/', function (req, res) {
		res.json({
			message : 'hooray! welcome to our api!'
		});
	});
	// router.get('/users', user.list);
	router.get('/video', function (req, res) {
		fs.readdir(__dirname, function (err, files) {
			if (err) {
				console.log(err);
			}
			files.forEach(function (name) {
				console.log(name);
			});
		});
		res.sendfile("views\\index.html");
	});

	router.get('/api/todos', function (req, res) {
		Todo.find(function (err, todos) {
			if (!err) {
				res.send(todos);
			} else {
				return res.send({
					error : 'Server error'
				});
			}
		});
	});

	router.post('/api/todo', function (req, res) {
		Todo.create({
			text : req.body.text,
			done : req.body.done
		}, function (err, todo) {
			if (err)
				res.send(err);
			// get and return all the todos after you create another
			Todo.find(function (err, todos) {
				if (err)
					res.send(err)
					res.json(todos);
			});
		});

	});
}
