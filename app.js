// App Purpose: Not-Etsy website for INFO2413. Team Five: Slingsby, Carlisle, Ricky, Savraj, Marcs.
// Languages / Dialects Used: NodeJS, MongoDB NoSQL, EJS, JQuery, JavaScript, HTML, CSS, Sass, Bootstrap.

// variables, so many variables, i can't hold them and i'd die
var express    = require('express'), 
	app          = express(),
	bodyParser   = require('body-parser'),
	cookieParser = require('cookie-parser'),
	flash        = require('connect-flash'),
	mongoose     = require("mongoose"),
	morgan       = require('morgan'),
	passport     = require("passport"),
	session      = require('express-session'),
	port         = process.env.PORT || 2000,
	bcrypt       = require('bcrypt'),
	user         = require("./models/users.js"),
	configDB     = require('./config/database.js'),
	inventory    = require("./models/inventories.js"),
	orders       = require("./models/orders.js");

// basic config
mongoose.connect(configDB.url, { useUnifiedTopology: true, useNewUrlParser: true });
require('./config/passport.js')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("public/assets/cmstyles.css", function(req, res){
	res.render("public/assets/cmstyles.css");
});

//this is required passport stuff touch and I will kill you -slingsby
app.use(session({ secret: 'sweetmercifulboyogivesusmorehopethantoddhoward', resave: true, saveUninitialized: true })); // Our boy tood howard
app.use(passport.initialize()); 
app.use(passport.session());
app.use(flash());


// Routes, aka we're shoving all our app.get/post somewhere else.
require('./config/routes.js')(app, passport);


// launch
app.listen(port);
app.listen(3000, '0.0.0.0', function(){
	console.log("Link access: Server Start!");
})