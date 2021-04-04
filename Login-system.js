npm install ejs
npm install express
npm install mongoose
npm install body-parser
npm install passport passport-local
npm install passport-local-mongoose

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
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority");
//end

//abreviation of project (use app as test name)  
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localPass(user.authenticate())); 
passport.serializeUser(user.serializeUser()); 
passport.deserializeUser(user.deserializeUser()); 

 
app.get("/", function (req, res) { 
res.render("home"); 
}); 

get("/register", function (req, res) { 
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
} 
  
var port = process.env.PORT || 2000; 
app.listen(port, function () { 
    console.log("Booted up."); 
});
