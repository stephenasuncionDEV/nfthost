const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogsSchema = new Schema({
    version: {
        type:String, 
        required:true
    },
    date: {
        type:String, 
        required:true
    },
    author: {
        type:String, 
        required:true
    },
    body: {
        type:String, 
        required:true
    }
});

exports.Log = mongoose.model('log', LogsSchema);