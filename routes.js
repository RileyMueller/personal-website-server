const express = require('express');
const rssfeedController = require('./controllers/rssfeed.controller');
const BlogPost = require('./models/blogpost.model');
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


router.get('/api/rssfeeds', (req, res) => {
    rssfeedController.getRSSFeeds().then(data => res.json(data));
});

router.post('/api/rssfeed', (req, res) => {
    rssfeedController.saveRSSFeed(req.body.url).then(data => res.json(data));
});
router.put('/api/rssfeed', (req, res) => {
    rssfeedController.updateRSSFeed(req.body.url).then(data => res.json(data));
});
router.delete('/api/rssfeed/:id', (req, res) => {
    rssfeedController.deleteRSSFeed(req.params.id).then(data => res.json(data));
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


module.exports = router;
