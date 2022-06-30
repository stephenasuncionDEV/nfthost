const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MembersSchema = new Schema({
    address: {
        type:String, 
        required:true,
        unique:true
    },
    wallet: {
        type:String,
        required:true
    },
    email: {
        type:String,
        default: ''
    },
    picture: {
        type:String, 
        default: 'https://www.nfthost.app/assets/logo.png'
    },
    isBanned: {
        type:Boolean,
        default: false
    },
    services: {
        generator: {
            generationCount: {
                type: Number,
                default: 0
            },
            freeGeneration: {
                type: Number,
                default: 0
            },
        },
        website: {
            websiteCount: {
                type: Number,
                default: 0
            },
            freeWebsite: {
                type: Number,
                default: 0
            }
        },
        utils: {
            freeUtil: {
                type: Number,
                default: 0
            }
        }
    }
}, { timestamps: true });

exports.Member = mongoose.model('member', MembersSchema);