//this file can be called whatever we need it to be .js for the moment any place where I used .get doesn't contain a file name immediately
//setting the variables for the languages

var express = require("express"); 
var mongoose = require("mongoose"); 
var passport = require("passport"); 
var bodyParser = require("body-parser"); 
var localPass = require("passport-local"); 
var passLocalMongo = require("passport-local-mongoose");
var user = require("./models/user"); 
const bcrypt = require("bcrypt");


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
  //this is the important part. i still havent tested cause I keep runniong into an error but Im going to try and fix it or just try and implement it into the main code and test it that way

app.post("/login",(req,res) =>  { 
    MongoClient.connect('mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority',(error,db) => {
        if(error)
        console.log(error)
        db.db("testDB").collection("accounts").find({username: username}).toArray((err,user)=> {
            if(err)
            console.log(err)
            if(!user[0])
            {
                console.log("User Not Found")
                res.status(404).send("User not Found")
            }
            else{
                let bool = bcrypt.compareSync(req.body.login,user[0].password)
                if(bool == false){
                    res.status(404).send("Invalid Password")
                }
                else {
                    res.send("Logged in")
                    res.redirecta('/isLoggedIn');
                }
            }
            
        })
        db.close();
    })
    
 
}),

function (req, res) { 
  res.render("login");
}; 
   
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
