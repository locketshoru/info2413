const bcrypt = require ('bcrypt'); 

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

//I have to edit this so it can take in a password and also upload it. And make the compare function seperate as well. This is just test code for now.