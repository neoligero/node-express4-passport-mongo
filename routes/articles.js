var express = require('express');
var router = express.Router();
var articles = require(__base + "models/article.js");


/*
router.use execute function in all calls count with position
params for url between slash
query for get
body for post
*/


/* 
	GET articles list 
*/
router.get('/articleList', function(req, res, next) {

	var options = {};
	if( typeof(req.query.atitle) !== "undefined" )
		options.title = req.query.atitle;

	articles.articleList( options, function(err, articles){
		if(err) { return next(err); } //goes to app.js error handler
		
		res.render('index', { articles: articles } );
	});
});


/*
	NEW ARTICLE
*/
router.get('/new', function(req, res, next){
	res.render("newArticle");
});

router.post('/new', function(req, res, next){
	var options = {};
	options.title = req.body.title;
	options.subtitle = req.body.subtitle;
	options.author = req.body.author;
	options.date = req.body.date;
	options.text = req.body.text;

	articles.addArticle( options, function(err){
		if(err){ return next(err); }
		
		req.session.action_response = true;
		req.flash('info', 'Article inserted.');
		res.redirect("/");
	});
});


/*
 *	REMOVE ARTICLE
 */
router.get('/remove/:id', function(req, res, next){
	articles.removeArticle( req.params.id, function(err){
		if(err){ return next(err); }
		
		req.flash('info', 'Article removed.');
		res.redirect("/");
	});
});


module.exports = router;
