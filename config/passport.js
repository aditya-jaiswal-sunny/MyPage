var passport = require('passport');
var Users = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done) {
	done(null ,user.id);
});

passport.deserializeUser(function(id,done) {
	Users.findById(id,function(err,user) {
		done(err,user);
	});
});

passport.use('local.signup',new LocalStrategy({
	usernameField:'email',
	passwordField:'password',
	passReqToCallback:true
},
function(req,email,password,done) {
	Users.findOne({'email':email}, function(err,user) {
		if(err) {
			return done(err);
		}
		if(user) {
			return done(null,false, {message:'Email already in use'});
		}
		var newUser = new Users();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err,result) {
			if(err) {
				return done(err);
			}
			return done(null,newUser);
		});
	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField:'email',
	passwordField:'password',
	passReqToCallback:true
}, 
function(req,email,password,done) {
    Users.findOne({'email':email}, function(err,user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false, {message:'No User Found'});
		}
		if(!user.validPassword(password)) {
			return done(null, false, {message: 'Wrong password'});
		}
		return done(null, user);
		
		});
	}));