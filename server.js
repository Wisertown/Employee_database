var express = require('express');
var app = express();

//body parser for post info
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');
app.set('views', (__dirname+'/views'));

//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressProjectSchema');

var UserSchema;
var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req, res){
	User.find({}, function(err, records){
	res.render('index', {users: records});
	})
})

app.post('/users', function(req, res){
	userInstance = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	})
	userInstance.save(function(err){
		res.redirect('/');
	})
	console.log(userInstance);
})

app.get('/users/:id/edit', function(req,res){
	User.findOne({_id:req.params.id}, function(err, record){
		res.render('show', {user: record})
	})
})

app.post('/users/:id/update', function(req,res){
	User.update({_id: req.params.id}, req.body,  function(err, record){
		res.render('/')
	})
})

app.get('/users/:id/delete', function(req,res){
	User.remove({_id:req.params.id}, function(err){
		res.redirect('/');
	})
})

app.listen(1337);
