const RSSFeed = require('../models/RSSFeed');
const BlogPost = require('../models/BlogPost');

module.exports = async function seedDatabase(){
    
    const blogPost = new BlogPost({
        title: 'Seeded Blog Post Title',
        subtitle: 'Seeded Blog Post Subtitle',
        body: 'Seeded Blog Post body'
    });
    
    // Save the blogpost document to the database
    await blogPost.save();

    const feed = new RSSFeed({
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
    });

    await feed.save();
}