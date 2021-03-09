// App Purpose: Not-Etsy website for INFO2413. Team Five: Slingsby, Carlisle, Ricky, Savraj, Marcs.
// Author: Dorothie Slingsby, 100389178. Completion Date: 08/08/2020
// Languages / Dialects Used: NodeJS, MongoDB NoSQL, EJS, JQuery, JavaScript, HTML, CSS, Sass, Bootstrap.
// Notes: The first sixteen poems displayed were written by yours truly. If you want to submit your own, go for it. Please do not submit work that doesn't belong to you. They are not examples: these are actual poems I have written and occasionally competed provincially with. Most all of them are currently permanently online on DeepUndergroundPoetry.

// base setup
var express    = require("express"), 
	app          = express(), 
	Order        = require("./models/orders"),
/*	Inventory    = require("./models/inventory"),
	Accounts     = require("./models/accounts"), */
	bodyParser   = require("body-parser");
const mongoose = require('mongoose'); //This is Mongo, someone else can make it work properly.

app.get("public/assets/cmstyles.css", function(req, res){ //custom css
	res.render("public/assets/cmstyles.css");
});


//main functions
app.get("/", function(req,res){ //index page
			res.render("index.ejs");
});

app.get("/tos", function(req,res){ //terms of service page
	res.render("tos.ejs");
});

app.get("/new", function(req,res){ //submit page
	res.render("new.ejs");
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
});

app.listen(3000, '0.0.0.0', function(){ //open server
	console.log("Server Start!");
})