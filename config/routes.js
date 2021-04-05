// app/routes.js
module.exports = function(app, passport) {
	
	var User  = require("../models/users.js"),
	configDB  = require('../config/database.js'),
	Inventory = require("../models/inventories.js"),
	Order    = require("../models/orders.js");
	
	require('dbfunctions.js')(app, passport);
	require('rolepermissions.js')(app, passport);

 app.get('/', function(req, res) {
	res.render('index.ejs', {user:req.user,isLogged:isLoggedIn});
 });

	app.get('/login', function(req, res) {
		res.render('login.ejs', {message:req.flash('loginMessage'),user:req.user,isLogged:isLoggedIn}); 
	});

	app.get('/register', function(req, res) {
		res.render('register.ejs', {message:req.flash('signupMessage'),user:req.user,isLogged:isLoggedIn});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/account',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.post('/register', passport.authenticate('local-signup', {
		successRedirect: '/', 
		failureRedirect: '/register',
		failureFlash: true //
	}));
	
	app.get('/account', isLoggedIn, (req, res) => {
		Order.find({}, function(err, orderhistory) {
			if (err){
				console.log(err);
			}else{
				res.render('account.ejs', {orders:orderhistory,user:req.user,isLogged:isLoggedIn});
			}
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get("/tos", function(req,res){ //terms of service page
		res.render("tos.ejs", {user:req.user,isLogged:isLoggedIn});
	}); 

	app.get("/asearch", requirePaid, function(req,res){ //advanced search page
		res.render("asearch.ejs", {user:req.user,isLogged:isLoggedIn});
	});

	app.get("/orderedit", requirePaid, function(req,res){
		Order.findById(req.params.id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
		res.render("orderedit.ejs", {user:req.user,isLogged:isLoggedIn,order:foundOrder});
			}	
		});
	});
	
	app.get("/eacc", requireAdmin, function(req,res){ //terms of service page
		User.find({}, function(err, alluser){
			res.render("eacc.ejs", {user:req.user, userdata:alluser, isLogged:isLoggedIn});
		}).sort({$natural:-1});
	});

	app.post("/users/:id", updateUserInfo); //modifying user
	
	app.post("/account", passport.authenticate('local-admin-signup', {
		successRedirect : '/', 
		failureRedirect : '/account',
		failureFlash : true
	}));
	
	app.post("/:id", function(req,res){ //deleting user
  	console.log("Deleting " + req.params.id);
		var deluser = { _id: req.params.id };
		user.deleteOne(deluser, function(err, obj) {
			if (err) throw err;
			console.log("Deletion successful.");
			res.render("index.ejs", {user:req.user,isLogged:isLoggedIn});
		});
	});	

	app.get("/ibrowse", requirePaid, function(req,res){ // browse items page
		Inventory.find()
			.then((result) => {
			res.render('ibrowse.ejs', {inventories:result,user:req.user,isLogged:isLoggedIn});
		})
		.catch((err) => {
			console.log(err);
		})
	});

	/* Need to figure out proper order.tags for each respective spot.
	 * Also need to look into figuring out a few things regarding who's ordered what.
	 * Besides that, the route functions properly
	 */

	app.get('/obrowse', requirePaid, function(req, res) {
		Inventory.find({}, function(err, inventories) {
			if(err) {
				console.log(err);
			} else {
				Order.find({}, function(err, orders) {
					if(err) {
						console.log(err)
					} else {
						res.render('obrowse.ejs', {orders:orders,inventories:inventories,user:req.user,isLogged:isLoggedIn})
					}
				});
			}
		});
	});

	app.get("/overview", isLoggedIn, function(req,res){ // view order page
		Order.findById(req.params.id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
				res.render("overview.ejs", {order: foundOrder,user:req.user,isLogged:isLoggedIn});
			}   
		});
	});

	app.get("/search", isLoggedIn, function(req,res){ //search page
		res.render("search.ejs",{user:req.user,isLogged:isLoggedIn});
	});
	
	app.post("/search", function(req,res){ //Basic search by order ID.
		app.get("/overview");
		Order.findById(req.params.id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
				res.render("overview.ejs", {order: foundOrder,user:req.user,isLogged:isLoggedIn});
			}   
		});
	});
	
	/* app.get("*", function(req,res){ //404 error, uncomment last
		res.render("404.ejs");
	}); */
}