// App Purpose: Not-Etsy website for INFO2413. Team Five: Slingsby, Carlisle, Ricky, Savraj, Marcs.
// Languages / Dialects Used: NodeJS, MongoDB NoSQL, EJS, JQuery, JavaScript, HTML, CSS, Sass, Bootstrap.

// base setup
var express        = require('express'), 
	app            = express(), 
	bodyParser     = require('body-parser'),
    localPass      = require('passport-local'), 
    passLocalMongo = require('passport-local-mongoose'),
    port           = process.env.PORT || 2000;
const mongoose       = require('mongoose'),
	  Order          = require('./models/orders'),
	  Inventory      = require('./models/inventories'),
	  Accounts       = require('./models/accounts'), 
	  bcrypt         = require('bcrypt'),
	  flash          = require('express-flash'),
	  session        = require('express-session'),
	  methodOverride = require('method-override'),
	  passport       = require('passport');


// I believe user.email / user.id needs to reference the database -todo-
const initializePassport = require('./passport-config')
initializePassport
(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)
)

	// Connect to MongoDB
	dbURI = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority' //user: administrator pw: test 1234 database: TestDB
	mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('Connected to database.'))
	.then((result) => app.listen(5000))
	.catch((err) => console.log(err));

	//This is to make Node be nice to me. -Slingsby
	app.set("view engine", "ejs");
	app.use('/public', express.static('public'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.get("public/assets/cmstyles.css", function(req, res){
		res.render("public/assets/cmstyles.css");
	});

	// Test mongoose / mongo sandbox routes
	// Testing implementation, if you add '/add-inventory' for the url,
	// it should update the document collection and send the result to the browser
	app.get('/add-inventory', (req, res) => {
		const inventory = new Inventory({
			title: 'Razor blade refill',
			image: 'https://i.imgur.com/ahlXbei.png',
			description: 'A razor blade refill for shaving.',
			price: '$10.99',
		})
		
		inventory.save()
			.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err)
		});
	})
	
	// Check inventory document collection in database
	app.get('/all-inventory', (req, res) => {
		Inventory.find()
			.then((result) => {
				res.send(result);
		})
		.catch((err) => {
			console.log(err);
		})
	})

	app.get('/single-inventory', (req, res) => {
		Inventory.findById('60567dccac611d40a803f133') // Pulls up digital scale document from database
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err);
		})
	})

	// end of sandbox routes :)

  
	function isLoggedIn(req, res, next) { 
			if (req.isAuthenticated()) return next(); 
			res.redirect("/login"); 
	}


//Bcrypt test code.
const saltRounds = 10;  
var password = "abc123"; //this would be password thtas already in database
var password2 = "abc1234"; //this is password that is entered.
bcrypt.hash(password, saltRounds, function(err, hash) { 
  bcrypt.compare(password2, hash, function(err, result) { 
    if (result) {
          console.log("It matches!")//this will call for the login function
    }
    
    else {
          console.log("Invalid password!");//this can lead to message that the username/password is incorrect
    }
  });
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

// Need to look into this at some point
// was app.post before
app.get("/cart", function(req,res){ //submit order
	
	var itemList = req.body.itemList;
	var customer = req.body.customer;
	var newOrder = {itemList: itemList, customer: customer};
	Order.create(newOrder, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/cart");}
		});
	
	res.render("cart.ejs");
});

// Refer to this if you're stuck for getting collections synced to routes :)
app.get("/ibrowse", function(req,res){ // browse items page
	Inventory.find()
		.then((result) => {
		res.render('ibrowse.ejs', { inventories: result });
	})
	.catch((err) => {
		console.log(err);
	})
});

/* Need to figure out proper order.tags for each respective spot.
 * Also need to look into figuring out a few things regarding who's ordered what.
 * Besides that, the route functions properly
 */
app.get("/obrowse", function(req,res){ // browse / current orders page
	Order.find()
		.then((result) => {
		res.render('obrowse.ejs', { orders: result });
	})
	.catch((err) => {
		console.log(err);
	})
});


app.get("/overview", function(req,res){ // view order page
	res.render("overview.ejs");
});


app.get("/search", function(req,res){ //search page
	res.render("search.ejs");
});


app.get("/tos", function(req,res){ //terms of service page
	res.render("tos.ejs");
}); 

// For the login setup, I have left the previous code here to reference in the future.
// If this all ends up working properly in the future, we could probably do away with the commented code.


// Passport login setup.
/* This is now referenced in passport-config.js & linked above
passport.use(new localPass(user.authenticate())); 
passport.serializeUser(user.serializeUser()); 
passport.deserializeUser(user.deserializeUser());
*/


/*
app.get('/login', function(req,res) {
	res.render('login.ejs');
})
*/
app.get('/login', checkNotAuthenticated, (req,res) => { //login page
	res.render('login.ejs');
})
/*
app.post("/login", passport.authenticate("local", { 
   	successRedirect: "/secret", 
   	failRedirect: "/login"
}), function (req, res) { 
	res.render("login");
});
*/
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/secret',
	failRedirect: '/login',
	failureFlash: true
}))
// Commented out just for testing purposes
/*  
	app.get("/logout", function (req, res) { 
	req.logout(); 
	res.redirect("/"); 
}); 
*/
app.delete('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

// end of login system :)

/* app.get("/register", function(req,res){ //register page
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
}); */ 
//I forgot we aren't registering users. -Slingsby


app.listen(3000, '0.0.0.0', function(){ //Server start, so is accessible from a link.
	console.log("Server Start!");
}) 
  

app.listen(port, function () { 
    console.log("Booted up."); 
}); 


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}