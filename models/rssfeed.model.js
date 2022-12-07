const mongoose = require('mongoose');

const RSSFeedSchema = new mongoose.Schema(
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

const RSSFeed = mongoose.model('RSSFeed', RSSFeedSchema);

module.exports = { RSSFeed :  RSSFeed}