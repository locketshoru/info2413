// App Purpose: Not-Etsy website for INFO2413. Team Five: Slingsby, Carlisle, Ricky, Savraj, Marcs.
// Languages / Dialects Used: NodeJS, MongoDB NoSQL, EJS, JQuery, JavaScript, HTML, CSS, Sass, Bootstrap.

// base setup
var express    = require("express"), 
	app          = express(), 
	Order        = require("./models/orders"),
	Inventory    = require("./models/inventory"),
	Accounts     = require("./models/accounts"), 
	bodyParser   = require("body-parser");
const mongoose = require('mongoose'); //This is Mongo, someone else can make it work properly.

	// Connect to MongoDB
	dbURI = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority' //user: administrator pw: test 1234 database: TestDB
	mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('Connected to database.'))
	.then((result) => app.listen(5000)) // This might be redundant as it's mentioned on line 71 (other app.listen in app.js)? [No it's not, line 71 makes the server able to actually exist on a webpage. -D]
	.catch((err) => console.log(err));

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

app.get("public/assets/cmstyles.css", function(req, res){ //custom css
	res.render("public/assets/cmstyles.css");
});


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

app.get("/obrowse", function(req,res){ // browse / current orders page
	res.render("obrowse.ejs");
});

app.get("/overview", function(req,res){ // view order page
	res.render("overview.ejs");
});

app.get("/register", function(req,res){ //register page
	res.render("register.ejs");
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