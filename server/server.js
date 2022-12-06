const express = require('express');
const { getFeed } = require('./controller.rssfeed');
const { RSSFeed } = require('./db/models');
const { db } = require('./db/conn');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const port = 4000;

app.post('/api/save_document', (req, res) => {
    try {
        // Get the name of the model for the document and its data
        const { modelname, data } = req.body;

        const Model = db.model(modelname);

        const doc = new Model(data);

        doc.save();

        res.send({
            status: 'success',
            message: `Successfully saved document`
        });

    } catch (err) {
        res.send({
            status: 'error',
            message: 'Failed to create document',
            error: err.message
        })
    }
})

app.get('/api/find_documents', async (req, res) => {
    try {
        const { modelname, filter } = req.body;
        const Model = db.model(modelname);
        const docs = await Model.find(filter).exec();

        res.send({
            status: 'success',
            message: `Found documents`,
            documents: docs
        });

    } catch (err) {
        res.send({
            status: 'error',
            message: 'Failed to get documents',
            error: err.message
        });
    }
})

// GET /api/get_models
app.get('/api/get_models', (req, res) => {
    try {
        let models = {};
        let model_names = Object.keys(db.models);
        for (let i = 0; i < model_names.length; i++) {
            let model_name = model_names[i];
            models[model_name] = db.models[model_name].schema.paths;
        }

        res.send({
            status: 'success',
            message: 'Successfully retrieved models',
            names: model_names,
            models: models
        });
    } catch (err) {
        res.send({
            status: 'error',
            message: 'Failed to retrieve models',
            error: err.message
        });
    }
});

app.post('/api/save_rss_feed', async (req, res) => {
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
                res.send({
                    status: 'success',
                    message: 'Stored feed is already up to date',
                });
            } else {

                let x = rssFeed.items.slice(n - extra - 1, n);
                
                dupe.items = dupe.items.concat(x);

                await dupe.save();
                res.send({
                    status: 'success',
                    message: `Saved an additional ${extra} item(s) to feed`,
                });
            }
        } else {
            // Save the RSSFeed model to the database
            await rssFeed.save();
            res.send({
                status: 'success',
                message: 'Successfully saved RSS feed',
            });
        }

    } catch (err) {
        res.send({
            status: 'error',
            message: 'Failed to save RSS feed',
            error: err.message,
        });
    }
})

app.listen(port, () => {
    console.log(`Node.js server listening on port ${port}`);
});
