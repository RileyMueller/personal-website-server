const {BlogPost} = require('../models/blogpost.model');

module.exports = async function seedDatabase(){

    const posts = [
        {
            title: 'Seeded Blog Post Title',
            subtitle: 'Seeded Blog Post Subtitle',
            body: 'Seeded Blog Post body',
            tags: ['testtag1']
        },
        {
            title: 'seeded2',
            subtitle: 'seeded2',
            body: 'body',
            tags: ['testtag1', 'testtag2']
        }
    ]

    const promises = []

    posts.forEach(async post => {
        const Post = new BlogPost(post);
        const promise = Post.save();
        promises.push(promise);
    });

    await Promise.all(promises);

}