const { RSSFeed } = require('../models/rssfeed.model');

class RSSFeedRepository {

    async getRSSFeeds() {
        const feeds = await RSSFeed.find({});
        return feeds;
    }

    async saveRSSFeed(rssfeed) {
        let data = {};
        try {
            data = await RSSFeed.create(rssfeed);
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return data;
    }

    async updateRSSFeed(rssfeed) {
        let data = {};
        try {
            data = await RSSFeed.updateOne(rssfeed);
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return data;
    }

    async deleteRSSFeed(rssfeedId) {
        let data = {};
        try {
            data = await RSSFeed.deleteOne({ _id: rssfeedId });
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }

}

module.exports = new RSSFeedRepository();