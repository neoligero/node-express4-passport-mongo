var express = require('express');
var articles = require(__base + "models/article.js");


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = function(passport){
	var router = express.Router();
	
	
	/* GET home page. */
	router.get('/', isAuthenticated, function(req, res, next) {
		
		var options = {};
		if( typeof(req.query.atitle) !== "undefined" )
			options.title = req.query.atitle;
	
		articles.articleList( options, function(err, articles){
			if(err) { return next(err); } //goes to app.js error handler
			
			res.render('index', { articles: articles } );
		});
		
	});
	
	
	/* Handle Login POST */
	router.get('/login', function(req, res){
		res.render('login');
	});
	
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));
	
	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});
	
	
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));
	
	
	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}