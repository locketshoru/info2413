// config/passport.js
var LocalStrategy   = require('passport-local').Strategy,
	User            = require('../models/users.js');

module.exports = function(passport) {
	
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({
		emailField    : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
		function(req, email, password, done) {
			process.nextTick(function() {
				User.findOne({ 'email': email }, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					} 
					else {
							var newUser = new User();
						newUser.role     = 'customer';
						newUser.username = req.body.username;
						newUser.email    = req.body.email;
						newUser.password = newUser.generateHash(password.toString());
						newUser.name     = req.body.name;
						newUser.save(function(err) {
							if (err) {
								throw err;
							} else return done(null, newUser);
						})
					}
				});
			});
		}
	));

	passport.use('local-admin-signup', new LocalStrategy({
		emailField    : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
		function(req, email, password, done) {
			process.nextTick(function() {
				User.findOne({ 'email': email }, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					} 
					else {
							var newUser = new User();
						newUser.role     = 'employee';
						newUser.username = req.body.username;
						newUser.email    = req.body.email;
						newUser.password = newUser.generateHash(password.toString());
						newUser.name     = req.body.name;
						newUser.save(function(err) {
							if (err) {
								throw err;
							} else return done(null, newUser);
						})
					}
				});
			});
		}
	));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		User.findOne({ 'email' :  email }, function(err, user) {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			return done(null, user);
		});

	}));

};
