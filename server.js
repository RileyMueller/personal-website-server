const express = require('express');
const cors = require('cors');

const app = express();
const api = express();

api.use(cors());
api.use(express.json());

// This block grabs every controller from controllers directory and adds them to the api
const pathJoin = require('path').join;
const controllerDirectory = pathJoin(__dirname, 'controllers');
require('fs').readdirSync(controllerDirectory).forEach((controller)=>{
    const controllerFile = pathJoin(controllerDirectory, controller);
    api.use('/', require(controllerFile));
});

app.use('/api',api);

module.exports = app;