const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebsitesSchema = new Schema({
    data: {
        type:String,
        default: 'FreeTemplate1'
    },
    memberId: {
        type:Schema.ObjectId, 
        default: null
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
            default: '',
            required: true
        },
        unrevealedImage: {
            type:String,
            default: 'https://www.nfthost.app/assets/logo.png',
            required: true
        },
        description: {
            type:String,
            default: '',
            required: true
        },
        embed: {
            type:String,
            default: '',
            required: true
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