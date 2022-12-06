const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RSSFeedSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: true
		},
		items: [
			{
				title: {
					type: String,
					required: true
				},
				description: {
					type: String,
					required: true
				},
				link: {
					type: String,
					required: true
				},
				pubDate: {
					type: Date,
					required: true
				}
			}
		]
	}
);

module.exports = mongoose.model('RSSFeed', RSSFeedSchema);