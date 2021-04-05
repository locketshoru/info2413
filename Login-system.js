//this file can be called whatever we need it to be .js for the moment any place where I used .get doesn't contain a file name immediately
//setting the variables for the languages

var express = require("express"); 
var mongoose = require("mongoose"); 
var passport = require("passport"); 
var bodyParser = require("body-parser"); 
var localPass = require("passport-local"); 
var passLocalMongo = require("passport-local-mongoose");
var user = require("./models/user"); 

//add mongoose in between here if needed

//end

//abreviation of project (use app as test name)  
var express = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded(extended));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localPass(user.authenticate())); 
passport.serializeUser(user.serializeUser()); 
passport.deserializeUser(user.deserializeUser()); 

 
app.get("/", function (req, res) { 
	res.render("home"); 
}); 

app.get("/register", function (req, res) { 
	res.render("register"); 
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
  

app.get("/login", function (req, res) { 
    res.render("login"); 
}); 
  
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/secret", 
    failRedirect: "/login"
}), 

function (req, res) { 
  res.render("login");
}); 
   
app.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
}); 
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
};
  
var port = process.env.PORT || 2000; 
app.listen(port, function () { 
    console.log("Booted up login."); 
});
