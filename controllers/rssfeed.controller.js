const rssfeedService = require('../services/rssfeed.service');

class RSSFeedController {

    async getRSSFeeds() {
        return await rssfeedService.getRSSFeeds();
    }

    async saveRSSFeed(url) {
        return await rssfeedService.saveRSSFeed(url);
    }

    async updateRSSFeed(url){
        return await rssfeedService.updateRSSFeed(url);
    }

    async deleteRSSFeed(rssfeedId){
        return await rssfeedService.deleteRSSFeed(rssfeedId);
    }
}

module.exports = new RSSFeedController();


