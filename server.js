var express = require("express");
	bodyParser = require("body-parser");
	mongoose = require("mongoose");
	path = require("path");
	port = 8000;

// create express app
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, "./views"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/crud_dashboard');

var DogSchema = new mongoose.Schema({
	name: String,
	age: Number
})

// Setting this schema into our models
mongoose.model('Dog', DogSchema);

// retreving this schema from our models
var Dog = mongoose.model('Dog');



app.get('/', function(req, res){
	Dog.find({}, function(err, results){
		if (err) {
			console.log("ERROR!!", err) 
		}else{

			res.render("index", {dogs:results});
		}

	});
});




app.post('/', function(req, res){
	var dog = new Dog({name: req.body.name, age:req.body.age});
	dog.save(function(err){
		if (err) { 
			console.log("ERROR!!", err) 
		}else{ 
				console.log("succesfuly added new dog")
				res.redirect('/');
		};
	});
});


app.get('/new', function(req, res){
  res.render('new');
});


app.get('/:id/edit', function(req, res){
	console.log("in Edit method");
	Dog.findOne({_id:req.params.id}, function(err, results){
		if (err) {
			console.log("inside edit method error appeared", err);
		}

  		res.render('edit', {dogs:results});
	})
});


app.get('/:id/show', function(req, res){
	console.log("in Show method");
	Dog.findOne({_id:req.params.id}, function(err, results){
		if (err) {
			console.log("inside Show method error appeared", err);
		}

  		res.render('show', {dogs:results});
	})
});


app.post('/:id/delete', function(req, res){
	console.log("in delete method");
	Dog.remove({_id: req.params.id}, function(err){

  		res.redirect('/');
	})
});


app.post('/:id/update', function(req,res){
	console.log("inupdate method");
	Dog.update({_id: req.params.id}, req.body, function(err){

		res.redirect('/');
	})
});




 
app.listen(port, function(){
	console.log("Mongoose_dashboard");
	console.log("listening to", port);
})