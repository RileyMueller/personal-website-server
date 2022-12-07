const {RSSFeed} = require('../models/rssfeed.model');
const {BlogPost} = require('../models/blogpost.model');

module.exports = async function seedDatabase(){

    const feeds = [
        {
            title: "Test RSS Feed",
            description: "This is a test RSS feed for seeding a database",
            link: "http://test.com/rss",
            items: [
                {
                    title: "Test RSS Item",
                    description: "This is a test RSS item for seeding a database",
                    link: "http://test.com/item1",
                    pubDate: new Date()
                },
                {
                    title: "Another Test RSS Item",
                    description: "This is another test RSS item for seeding a database",
                    link: "http://test.com/item2",
                    pubDate: new Date()
                }
            ]
        },
        {
            "title": "RE: Trailer Trash",
            "description": "Latest updates of (RE: Trailer Trash)",
            "link": "https://www.royalroad.com/fiction/syndication/21322",
            "items": [

            ],
            "_id": "339012c7d6e728b3a0be2c52",
            "__v": 0
        }
    ]

    feeds.forEach(feed => {
        const Feed = new RSSFeed(feed);
        // Might have future issues by not awaiting here.
        Feed.save();
    });


    const blogPost = new BlogPost({
        title: 'Seeded Blog Post Title',
        subtitle: 'Seeded Blog Post Subtitle',
        body: 'Seeded Blog Post body'
    });
    
    // Save the blogpost document to the database
    await blogPost.save();

}