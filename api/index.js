// Dependencies
require('dotenv').config({path: "../.env"});
const express = require('express');
const cors = require('cors');
const router = require('../routes');
const app = express();
const {errorHandler} = require('../middlewares/errorHandler');
const production = false;

// Database
const connection = require('../db/connection');

// Express Config
app.options(cors());
if (!production) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
}
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