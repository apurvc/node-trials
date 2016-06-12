/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var	path = require('path');
var logger = require('morgan');
var router = express.Router(); // get an instance of the express Router
var bodyParser = require('body-parser');
//var database = require('./config/database');
var port = process.env.PORT || 3000;

	app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
	app.use(express.static(__dirname + 'videos/'));
	app.use(logger());                                         // log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
	app.use(bodyParser.json());                                     // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use("/app", router);
	require('./app/routes')(router);
	//require('./app/dbroutes')(router);

	app.listen(port, function() {
		console.log('Express server listening on port ' + port);
	});
