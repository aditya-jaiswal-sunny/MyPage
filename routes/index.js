var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf(); 
router.use(csrfProtection);  
var Users = require('../models/user');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup',{csrfToken: req.csrfToken()});
});
router.post('/signup', passport.authenticate('local.signup', {
successRedirect : '/login',
failureRedirect : '/signup',
failureFlash : true
}));

router.get('/login', function(req, res, next) {
  res.render('login',{csrfToken: req.csrfToken()});
});
router.post('/login', passport.authenticate('local.signin', {
successRedirect : '/',
failureRedirect : '/login',
failureFlash : true
}));


router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});
router.get('/intern', function(req, res, next) {
  res.render('intern');
});
router.get('/privacypolicy', function(req, res, next) {
  res.render('privacypolicy');
});

module.exports = router;
