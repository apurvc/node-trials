var fs = require('fs');

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
	/*router.get('/video', function (req, res) {
		fs.readdir(__dirname, function (err, files) {
			if (err) {
				console.log(err);
			}
			files.forEach(function (name) {
				console.log(name);
			});
		});
		res.sendfile("public\\index.html");
	});*/

}
