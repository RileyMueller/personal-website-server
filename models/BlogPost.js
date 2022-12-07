const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
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

module.exports = mongoose.model('BlogPost', blogPostSchema);