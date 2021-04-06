// app/routes.js
module.exports = function(app, passport) {
	
	var User        = require("../models/users.js"),
	configDB        = require('../config/database.js'),
	Inventory       = require("../models/inventories.js"),
	Order           = require("../models/orders.js"),
	dbFunctions     = require('./dbfunctions'),
	rolePermissions = require('./rolepermissions');

 app.get('/', function(req, res) {
	res.render('index.ejs', {user:req.user,isLogged:rolePermissions.isLoggedIn});
 });
	
	app.get("/tos", function(req,res){ //terms of service page
		res.render("tos.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
	}); 

	app.get('/login', function(req, res) {
		res.render('login.ejs', {message:req.flash('loginMessage'),user:req.user,isLogged:rolePermissions.isLoggedIn}); 
	});

	app.get('/register', function(req, res) {
		res.render('register.ejs', {message:req.flash('signupMessage'),user:req.user,isLogged:rolePermissions.isLoggedIn});
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
	
	app.get('/account', rolePermissions.isLoggedIn, (req, res) => {
		Order.find({}, function(err, orderhistory) {
			if (err){
				console.log(err);
			}else{
				res.render('account.ejs', {orders:orderhistory,user:req.user,isLogged:rolePermissions.isLoggedIn});
			}
		}).limit(5).sort({$natural:-1});;
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get("/eacc", rolePermissions.requireAdmin, function(req,res){ //edit accounts
		User.find({}, function(err, alluser){
			res.render("eacc.ejs", {user:req.user, userdata:alluser, isLogged:rolePermissions.isLoggedIn});
		}).sort({$natural:-1});
	});

	app.post("/users/:id", dbFunctions.updateUserInfo); //modifying user
	app.post("/avatar/:id", dbFunctions.updateUserAvatar); //modifying user avatar
	
	app.post("/account", passport.authenticate('local-admin-signup', {
		successRedirect : '/', 
		failureRedirect : '/account',
		failureFlash : true
	}));

	app.get('/obrowse', rolePermissions.requirePaid, (req, res) => {
		User.find({}, function(err, alluser){
			Inventory.find({}, function(err, inventories){
				Order.find({}, function(err, orders) {
					if(err) {
						console.log(err)
					} else {
						res.render('obrowse.ejs', {orders:orders,userdata:alluser,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn})
					}
				});
			});
		});
	});
	
	app.get('/account', rolePermissions.isLoggedIn, (req, res) => {
		Order.find({}, function(err, orderhistory) {
			if (err){
				console.log(err);
			}else{
				res.render('account.ejs', {orders:orderhistory,user:req.user,isLogged:rolePermissions.isLoggedIn});
			}
		}).limit(5).sort({$natural:-1});;
	});

	app.get("/overview/:id", rolePermissions.isLoggedIn, function(req,res){ // view order page
		Order.findById(req.params.id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
				res.render("overview.ejs", {order: foundOrder,user:req.user,isLogged:rolePermissions.isLoggedIn});
			}
		});
	});
	
	app.post("/overview/:id", rolePermissions.isLoggedIn, dbFunctions.updateOrderStatus, function(req,res){ // edit order status
		Order.findById(req.params.id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
				res.render("overview.ejs", {order: foundOrder,user:req.user,isLogged:rolePermissions.isLoggedIn});
			}
		});
	});

	app.post("/ordersave/:id", rolePermissions.requirePaid, function(req,res){ // edit order details	
		let order = {};
		order.id = req.params.id;
		order.customer = req.body.customer;
		order.item1Title = req.body.item1Title;
		order.item1Quantity = req.body.item1Quantity;
		if (req.body.item2Title != '' && req.body.item2Quantity != '') {
				order.item2Title = req.body.item2Title;
				order.item2Quantity = req.body.item2Quantity;
			}
			if (req.body.item3Title != '' && req.body.item3Quantity != '') {
				order.item3Title = req.body.item3Title;
				order.item3Quantity = req.body.item3Quantity;
			}
			if (req.body.item4Title != '' && req.body.item4Quantity != '') {
				order.item4Title = req.body.item4Title;
				order.item4Quantity = req.body.item4Quantity;
			}
			if (req.body.item5Title != '' && req.body.item5Quantity != '') {
				order.item5Title = req.body.item5Title;
				order.item5Quantity = req.body.item5Quantity;
			}
		if (order && req.body) {
			dbFunctions.updateOrderInfo(order);
			res.redirect('/obrowse');
		}
	});

	app.post("/orderedit/:id", rolePermissions.requirePaid, function(req,res){ // goto edit order details
		User.find({}, function(err, alluser){
			Inventory.find({}, function(err, inventories){
				Order.findById(req.params.id, function(err, foundOrder) {
					if(err) {
						console.log(err)
					} else {
						res.render('orderedit.ejs', {order:foundOrder,userdata:alluser,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn})
					}
				});
			});
		});
	});
	
	app.post("/order/:id", dbFunctions.deleteOrder, rolePermissions.isLoggedIn); //delete order
	
	app.post("/overview", rolePermissions.isLoggedIn, function(req,res){
		let order = {};
		order.customer = req.body.customer;
		order.item1Title = req.body.item1Title;
		order.item1Quantity = req.body.item1Quantity;
		if (req.body.item2Title != '' && req.body.item2Quantity != '') {
				order.item2Title = req.body.item2Title;
				order.item2Quantity = req.body.item2Quantity;
			}
			if (req.body.item3Title != '' && req.body.item3Quantity != '') {
				order.item3Title = req.body.item3Title;
				order.item3Quantity = req.body.item3Quantity;
			}
			if (req.body.item4Title != '' && req.body.item4Quantity != '') {
				order.item4Title = req.body.item4Title;
				order.item4Quantity = req.body.item4Quantity;
			}
		if (order && req.body) {
			dbFunctions.newOrder(order);
			res.redirect('/obrowse');
		} //submit new order
	});

	app.get("/search", rolePermissions.isLoggedIn, function(req,res){ //search page
		res.render("search.ejs",{user:req.user,isLogged:rolePermissions.isLoggedIn});
	});

	app.get("/asearch", rolePermissions.requirePaid, function(req,res){ //advanced search page
		res.render("asearch.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
	});
	
	app.post("/search", function(req,res){ //Basic search by order ID.
		Order.findById(req.body._id, function(err, foundOrder){
			if(err){
				console.log(err);
			} else {
				res.render("overview.ejs", {order: foundOrder,user:req.user,isLogged:rolePermissions.isLoggedIn});
			}   
		});
	});
	
	app.post("/asearchstat", function(req,res){ //Asearch: order status
		User.find({}, function(err, alluser){
			Inventory.find({}, function(err, inventories){
				Order.find({status: req.body.status}, function(err, orders){
					if(err){
						console.log(err);
					} else {
						res.render("obrowse.ejs", {orders: orders,userdata:alluser,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn});
					}
				});
			});
		});
	})
	
	app.post("/asearchname", function(req,res){ //Asearch: customer name
		User.find({}, function(err, alluser){
			Inventory.find({}, function(err, inventories){
				Order.find({customer: req.body.name}, function(err, orders){
					if(err){
						console.log(err);
					} else {
						res.render("obrowse.ejs", {orders: orders,userdata:alluser,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn});
					}
				});
			});
		});
	})
	
	 /* app.post("/asearchemail", function(req,res){ //Asearch: customer email
		Inventory.find({}, function(err, inventories){
			Order.find({}, function(err, orders){
				User.find({email: req.body.email}, function(err, user){
					//user = user[0];
					console.log(user + " " + user.username)
					if(err){
						console.log(err);
					} else {
						res.render("obrowse.ejs", {orders: orders,userdata:user,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn});
					}
				});
			});
		});
	}) */

	app.post("/asearchemail", function(req,res){ //Asearch: customer email
		Inventory.find({}, function(err, inventories){
			User.find({email: req.body.email}, function(err, foundUser){
				foundUser = foundUser[0];
				console.log(foundUser + " " + foundUser.username)
				Order.find({customer: foundUser.username}, function(err, orders){
					if(err){
						console.log(err);
					} else {
						res.render("abrowse.ejs", {orders: orders,userdata:foundUser,inventories:inventories,user:req.user,isLogged:rolePermissions.isLoggedIn});
					}
				});
			});
		});
	}) 
	
	
	app.get("/ibrowse", rolePermissions.requirePaid, function(req,res){ // browse items page
		Inventory.find()
			.then((result) => {
			res.render('ibrowse.ejs', {inventories:result,user:req.user,isLogged:rolePermissions.isLoggedIn});
		})
		.catch((err) => {
			console.log(err);
		})
	});
	
	app.post("/deluser/:id", function(req,res){ //deleting user. this goes last because it likes triggering for no good reason
  	console.log("Deleting " + req.params.id);
		var deluser = { _id: req.params.id };
		User.deleteOne(deluser, function(err, obj) {
			if (err) throw err;
			console.log("Deletion successful.");
			res.render("index.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
		});
	});	
	
	/* app.get("*", function(req,res){ //404 error, uncomment last
		res.render("404.ejs");
	}); */	
}