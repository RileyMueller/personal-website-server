const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
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
		},
		public: {
			type: Boolean,
			default: false
		},
		tags: {
			type: [String],
		}
	}
);


const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = {BlogPost}