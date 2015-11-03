var mongoose = require('mongoose');


exports.articleList = function ( options, callback ) {
	var article = mongoose.model("Article");
	
	article.find( options , function( err, articles ){
		if(err) return next(err);
		
		callback(null, articles);
	});
}


exports.articleListAjax = function ( options, callback ) {
	var article = mongoose.model("Article");
	
	article.find( options , function( err, articles ){
		if(err) return next(err);
		
		res.send(articles);
	});
}


exports.addArticle = function( data, callback ){
	var article = mongoose.model("Article");
	var add = new article({
		title: data.title, 
		subtitle: data.subtitle,
		author: data.author, 
		date: data.date, 
		text: data.text
	});

	add.save(function(err){
		if(err) return next(err);
		
		callback();
	});
}


exports.removeArticle = function( id, callback ){
	var article = mongoose.model("Article");
	
	article.remove( { _id : id }, function(err){
		if(err) return next(err);
		
		callback();
	});
}