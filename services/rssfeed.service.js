const rssfeedRepository = require('../repository/rssfeed.repository');
const fetch = require('node-fetch');
const FeedParser = require('feedparser');
var iconv = require('iconv-lite');

async function getFeed(url) {

    let items = [];
    let title, description, link

    // Parse the RSS feed using feedparser
    const res = await fetch(url, { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36', 'accept': 'text/html,application/xhtml+xml' })

    const feedparser = new FeedParser();

    // Setup feedparser stream
    feedparser.on('readable', function () {
        const stream = this;
        const meta = this.meta;
        title = meta.title;
        description = meta.description;
        link = meta.link;

        let item;
        while (item = this.read()) {
            items.unshift(item);
        }
    });

    await new Promise((resolve, reject) => {
        feedparser.on('error', reject);
        feedparser.on('end', resolve);

        // Handle our response and pipe it to feedparser
        if (res.status != 200) throw new Error('Bad status code');
        let charset = getParams(res.headers.get('content-type') || '').charset;
        let responseStream = res.body;
        responseStream = maybeTranslate(responseStream, charset);
        responseStream.pipe(feedparser);
    });


    return {
        title: title,
        description: description,
        link: link,
        items: items
    };
}

function maybeTranslate(res, charset) {
    var iconvStream;
    // Decode using iconv-lite if its not utf8 already.
    if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
        try {
            iconvStream = iconv.decodeStream(charset);
            console.log('Converting from charset %s to utf-8', charset);
            // If we're using iconvStream, stream will be the output of iconvStream
            // otherwise it will remain the output of request
            res = res.pipe(iconvStream);
        } catch (err) {
            res.emit('error', err);
        }
    }
    return res;
}

function getParams(str) {
    var params = str.split(';').reduce(function (params, param) {
        var parts = param.split('=').map(function (part) { return part.trim(); });
        if (parts.length === 2) {
            params[parts[0]] = parts[1];
        }
        return params;
    }, {});
    return params;
}

class RSSFeedService {

    async getRSSFeeds() {
        return await rssfeedRepository.getRSSFeeds();
    }

    async saveRSSFeed(url) {
        const feed = await getFeed(url);
        return await rssfeedRepository.saveRSSFeed(feed);
    }
    async updateRSSFeed(url) {
        const feed = await getFeed(url);
        return await rssfeedRepository.updateRSSFeed(feed);
    }
    async deleteRSSFeed(rssfeedId) {
        return await rssfeedRepository.deleteRSSFeed(rssfeedId);
    }

}

module.exports = new RSSFeedService();