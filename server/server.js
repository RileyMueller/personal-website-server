const express = require('express');
const routes = require('./routes');

const app = express();

app.get("/test", async (req, res) => {
    res.status(200).json({ message: "pass!" });
  });

app.use('/', routes)

module.exports = app;