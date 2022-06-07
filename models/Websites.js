const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebsitesSchema = new Schema({
    data: {
        type:String,
        default: ''
    },
    memberId: {
        type:Schema.ObjectId, 
        required:true
    },
    isPremium: {
        type:Boolean,
        default: false
    },
    isExpired: {
        type:Boolean,
        default: false
    },
    premiumStartDate: {
        type:Date,
        default: null
    },
    components: {
        title: {
            type:String,
            default: ''
        },
        unrevealedImage: {
            type:String,
            default: 'https://www.nfthost.app/assets/logo.png'
        },
        description: {
            type:String,
            default: ''
        },
        embed: {
            type:String,
            default: ''
        },
        script: {
            type:String,
            default: ''
        },
    },
    meta: {
        robot: {
            type:String,
            default: 'if'
        },
        favicon: {
            type:String,
            default: 'https://www.nfthost.app/favicon.ico'
        },
        language: {
            type:String,
            default: 'EN'
        }
    },
    analytics: {
        uniqueVisits : {
            type:Number,
            default: 0
        },
        clickedOnEmbed : {
            type:Number,
            default: 0
        },
        referrers : {
            type:Array,
            default: []
        }
    }
}, { timestamps: true });

exports.Website = mongoose.model('website', WebsitesSchema);