const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokensSchema = new Schema({
    address: {
        type:String, 
        required:true
    },
    refreshToken: {
        type:String,
        required:true
    }
}, { timestamps: true });

exports.Token = mongoose.model('token', TokensSchema);