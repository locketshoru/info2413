// App Purpose: Not-Etsy website for INFO2413. Team Five: Slingsby, Carlisle, Ricky, Savraj, Marcs.
// Languages / Dialects Used: NodeJS, MongoDB NoSQL, EJS, JQuery, JavaScript, HTML, CSS, Sass, Bootstrap.

// base setup
var express      = require("express"), 
	app            = express(), 
	Order          = require("./models/orders"),
	Inventory      = require("./models/inventory"),
	Accounts       = require("./models/accounts"), 
	bodyParser     = require("body-parser"),
  localPass      = require("passport-local"), 
  passLocalMongo = require("passport-local-mongoose"),
  user           = require("./models/user"),
  port           = process.env.PORT || 2000;
const mongoose = require('mongoose');

	// Connect to MongoDB
	dbURI = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority' //user: administrator pw: test 1234 database: TestDB
	mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('Connected to database.'))
	.then((result) => app.listen(5000))
	.catch((err) => console.log(err));

	// Passport login setup.
	passport.use(new localPass(user.authenticate())); 
	passport.serializeUser(user.serializeUser()); 
	passport.deserializeUser(user.deserializeUser());

	// mongoose / mongo sandbox routes
	// Testing implementation, if you add '/add-inventory' for the url, it should pull up this information
	app.get('/add-inventory', (req, res) => {
		const inventory = new Inventory({
			title: 'Razor blade refill',
			image: 'https://drive.google.com/file/d/1aBS-vBJMYqYIjNd2OqNe2w_SOvRnqZgD/view?usp=sharing","ItemQuantity',
			description: 'A razor blade refill for shaving.',
			price: '$10.99',
		})
		
		inventory.save()
			.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err)
		})
	})

	//Custom CSS, don't touch.
	app.get("public/assets/cmstyles.css", function(req, res){
		res.render("public/assets/cmstyles.css");
	});

  
	function isLoggedIn(req, res, next) { 
			if (req.isAuthenticated()) return next(); 
			res.redirect("/login"); 
	}


//main functions
app.get("/", function(req,res){ //index page
			res.render("index.ejs");
});


app.get("/account", function(req,res){ // account details page
	res.render("account.ejs");
});


app.get("/asearch", function(req,res){ //advanced search page
	res.render("asearch.ejs");
});


app.post("/cart", function(req,res){ //submit order
	var itemList = req.body.itemList;
	var customer = req.body.customer;
	var newPoem = {itemList: itemList, customer: customer};
	Order.create(newOrder, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/cart");}
		});
	res.render("cart.ejs");
});


app.get("/ibrowse", function(req,res){ // browse items page
	res.render("ibrowse.ejs");
});


app.get("/login", function(req,res){ //login page
	res.render("login.ejs");
});
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/secret", 
    failRedirect: "/login"
}), function (req, res) { 
  res.render("login");
});    
app.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
}); 


app.get("/obrowse", function(req,res){ // browse / current orders page
	res.render("obrowse.ejs");
});


app.get("/overview", function(req,res){ // view order page
	res.render("overview.ejs");
});


app.get("/register", function(req,res){ //register page
	res.render("register.ejs");
});  
app.post("/register", function (req, res) { 
var username = req.body.username 
var password = req.body.password 
user.register(new user({ username: username }), 
           password, function (err, user) { 
       if (err) { 
           console.log(err); 
           return res.render("register"); 
        } 
  
        passport.authenticate("local")( 
            req, res, function () { 
            res.render("secret"); 
        }); 
    }); 
}); 


app.get("/search", function(req,res){ //search page
	res.render("search.ejs");
});


app.get("/tos", function(req,res){ //terms of service page
	res.render("tos.ejs");
});


app.listen(3000, '0.0.0.0', function(){ //Server start, so is accessible from a link.
	console.log("Server Start!");
}) 
  

app.listen(port, function () { 
    console.log("Booted up."); 
}); 