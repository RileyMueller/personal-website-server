const express = require('express');
const { getFeed } = require('./controller.rssfeed');
const RSSFeed = require('./models/RSSFeed');
const BlogPost = require('./models/BlogPost');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

router.post('/api/save_blogpost', async (req, res) => {
    try {
        const { title, subtitle, body } = req.body;
        const blogPost = new BlogPost({
            title: title,
            subtitle: subtitle,
            body: body
        });

        // Save the blogpost document to the database
        await blogPost.save();
        res.status(201).send({
            message: 'Successfully saved blog post',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

router.get('/api/get_blogposts', async(req, res) => { 
    try { 
        const posts = await BlogPost.find({}).exec(); 
        res.status(200).send({
            message: posts 
        }); 
    } catch (err) { 
        res.status(500).send({
            message: err.message 
        }); 
    } 
});

router.post('/api/save_rss_feed', async (req, res) => {
    try {
        // Get the URL of the RSS feed from the request body
        const { url } = req.body;

        const feed = await getFeed(url);

        // Create a new RSSFeed model with the parsed data
        const rssFeed = new RSSFeed({
            title: feed.title,
            description: feed.description,
            link: feed.link,
            items: feed.items
        });

        const dupe = await RSSFeed.findOne({ link: rssFeed.link }).exec();

        if (dupe) {
            const n = rssFeed.items.length;
            const extra = n - dupe.items.length;
            if (extra == 0) {
                res.status(304).send({
                    message: 'Stored feed is already up to date',
                });
            } else {

                let x = rssFeed.items.slice(n - extra - 1, n);

                dupe.items = dupe.items.concat(x);

                await dupe.save();
                res.status(201).send({
                    message: `Saved an additional ${extra} item(s) to feed`
                });
            }
        } else {
            // Save the RSSFeed model to the database
            await rssFeed.save();
            res.status(201).send({
                message: 'Successfully saved RSS feed',
            });
        }

    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
});

router.get('/api/get_rss_feeds', async(req, res) => { 
    try { 
        const docs = await RSSFeed.find({}).exec(); 
        res.status(200).send({
            message: docs 
        }); 
    } catch (err) { 
        res.status(500).send({ 
            message: err.message 
        }); 
    } 
});

module.exports = router;
