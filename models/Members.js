const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MembersSchema = new Schema({
    address: {
        type:String, 
        required:true,
        unique:true,
    },
    picture: {
        type:String, 
        default: 'https://www.nfthost.app/logo.png'
    },
}, { timestamps: true });

exports.Member = mongoose.model('member', MembersSchema);