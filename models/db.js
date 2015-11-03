var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title: { type: String, required: true},
	subtitle: { type: String },
	author: { type: String },
	date: { type: String },
	text: { type: String }
});

var UserSchema = new mongoose.Schema({
	username: { type: String, required: true},
	password: { type: String, required: true},
	email: { type: String}
});

mongoose.model('Article', ArticleSchema);
mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost:27018/blog');
