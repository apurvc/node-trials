var mongoose = require('mongoose');
var db = require('../../config/database');
	
var todoSchema = new mongoose.Schema({
	text : String,
	done : Boolean	
})
var Todo = db.model('Todo', todoSchema );
module.exports = Todo;