const {db, Schema} = require('./conn');

const kittenSchema = new Schema({
    name: String
});

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

const Kitten = db.model('Kitten', kittenSchema);

module.exports = {
    RSSFeed, Kitten
}