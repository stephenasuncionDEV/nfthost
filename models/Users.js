const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    address: {
        type:String, 
        required:true,
        unique:true,
    },
    generationCount: {
        type:Number, 
        required:true
    },
});

exports.User = mongoose.model('user', UsersSchema);