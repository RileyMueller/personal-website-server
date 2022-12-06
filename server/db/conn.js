const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
/**
 * To startup a docker container for a mongo database:
 * 1. docker pull mongo
 * 2. docker run -d -p 27017:27017 --name mongodb mongo
 */

const url = 'mongodb://localhost:27017/personal-website';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = {
    db,
    Schema: mongoose.Schema
}
