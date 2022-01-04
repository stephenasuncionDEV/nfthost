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
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

// Connection
connection.once('open', ()=>{
    console.log('Connected to db');
});

module.exports = app;