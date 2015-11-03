var mongoose = require('mongoose');

exports.signUp = function( data, callback ){
	var user = mongoose.model("User");
	var new_user = new user({
		username: data.username,
		password: data.password,
		email: data.email
	});
	
	new_user.save(function(err){
		if(err) return next(err);
		
		callback();
	});
};