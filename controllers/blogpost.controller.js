const blogpostService = require('../services/blogpost.service');
const router = require('express').Router();

router.get('/getblogposts', (req, res) => {
    const filter = req.headers.filter;
    blogpostService.getBlogPosts(filter)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
});

router.post('/createblogpost', (req, res) => {
    const post = req.body;
    blogpostService.createBlogPost(post)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json(err));
});

router.put('/updateblogpost', (req, res) => {
    const post = req.body;
    blogpostService.updateBlogPost(post)
        .then(data => res.status(202).json(data))
        .catch(err => res.status(400).json(err));
});

router.delete('/deleteblogpost', (req, res)=>{
    const id = req.body._id;
    blogpostService.deleteBlogPost(id)
        .then(data => res.status(200).json(data))
        .catch(err=>res.status(400).json(err));
});

module.exports = router;