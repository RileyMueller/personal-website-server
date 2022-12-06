const { db, Schema } = require('./conn');

// RSSFeed schema
const RSSFeedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      pubDate: {
        type: Date,
        required: true
      }
    }
  ]
});

// RSSFeed model
const RSSFeed = db.model("RSSFeed", RSSFeedSchema);


const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const BlogPost = db.model('BlogPost', blogPostSchema);

module.exports = {
  RSSFeed, BlogPost
}