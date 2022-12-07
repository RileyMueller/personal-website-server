const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			required: false
		},
		body: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		}
	}
);


const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost}