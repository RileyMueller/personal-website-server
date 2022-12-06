const express = require('express');
const { getFeed } = require('./controller.rssfeed');
const { RSSFeed, BlogPost } = require('./db/models');
const { db } = require('./db/conn');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json())

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
            status: 'success',
            message: 'Successfully saved blog post',
        });
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: 'Failed to get documents',
            error: err.message
        });
    }
})

router.get('/api/find_documents', async (req, res) => {
    try {
        const { modelname, filter } = req.body;
        const Model = db.model(modelname);
        const docs = await Model.find(filter).exec();

        res.status(200).send({
            status: 'success',
            message: `Found documents`,
            documents: docs
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: 'Failed to get documents',
            error: err.message
        });
    }
})

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

        const Model = db.model(RSSFeed.modelName);
        const dupe = await Model.findOne({ link: rssFeed.link }).exec();

        if (dupe) {
            const n = rssFeed.items.length;
            const extra = n - dupe.items.length;
            if (extra == 0) {
                res.status(304).send({
                    status: 'success',
                    message: 'Stored feed is already up to date',
                });
            } else {

                let x = rssFeed.items.slice(n - extra - 1, n);

                dupe.items = dupe.items.concat(x);

                await dupe.save();
                res.status(201).send({
                    status: 'success',
                    message: `Saved an additional ${extra} item(s) to feed`,
                });
            }
        } else {
            // Save the RSSFeed model to the database
            await rssFeed.save();
            res.status(201).send({
                status: 'success',
                message: 'Successfully saved RSS feed',
            });
        }

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: 'Failed to save RSS feed',
            error: err.message,
        });
    }
})

module.exports = router;
