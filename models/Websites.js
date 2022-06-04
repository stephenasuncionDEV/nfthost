const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebsitesSchema = new Schema({
    address: {
        type:String, 
        required:true,
        unique:true
    },
}, { timestamps: true });

exports.Website = mongoose.model('website', WebsitesSchema);