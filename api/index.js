// Dependencies
require('dotenv').config({path: "../.env"});
const express = require('express');
const cors = require('cors');
const router = require('../routes');
const app = express();
const {errorHandler} = require('../middlewares/errorHandler');
const production = true;

// Database
const connection = require('../db/connection');

// Express Config
app.options(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

// Connection
connection.once('open', () => {
    if (!production) {
        console.log("Connected to DB.")
        app.listen(8080, () => {
            console.log(`App listening at http://localhost:${8080}`)
        })
    }
});

module.exports = app;