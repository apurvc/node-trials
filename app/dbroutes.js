var Todo = require('./model/todo');
var moment = require('moment');

module.exports = function (router) {
    //for get calls
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
    //for get calls
	router.get('/api/:date', function (req, res) {
		if(moment(req.params.date).isValid()){
			return res.send({
					unix : moment.utc(req.params.date).valueOf(),
					natural: moment.utc(req.params.date).format("MMMM, DD YYYY")
				});			
		}else{
			return res.send({
					error : 'Server error'
				});
		}
	});	
    //for get calls
	router.get('/api/todos/:todo_id', function (req, res) {
		Todo.findById(req.params.todo_id,function (err, todo) {
			if (!err) {
				res.json(todo);
			} else {
				return res.send({
					error : 'Server error'
				});
			}
		});
	});	
    //post calls
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
	router.delete('/api/todos/:todo_id', function (req, res) {
		Todo.findByIdAndRemove(req.params.todo_id, function (err) {
			if (err)
				res.send(err);
			// get and return all the todos after you create another
			    res.json({ message: 'todo removed!' });
		});

	});
	
}
