// Dependencies
require('dotenv').config({path: "../.env"});
const express = require('express');
const cors = require('cors');
const router = require('../routes');
const app = express();
const {errorHandler} = require('../middlewares/errorHandler');

// Database
const connection = require('../db/connection');

// Express Config
app.options(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200);
    }
    next();
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

// Connection
connection.once('open', () => {
    console.log("[NFTHost] Connected to MongoDB")
    app.listen(8080, () => {
        console.log(`[NFTHost] listening at http://localhost:${8080}`)
    })
});

module.exports = app;