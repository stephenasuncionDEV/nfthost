const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebsitesSchema = new Schema({
    data: {
        type:String,
        default: 'eyJ0ZW1wbGF0ZSI6IlTHCzEiLCJzdHlsZSI6eyJiZ0NvbG9yIjoiIiwiYmdJbWFnxCwifX0='
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
    revealDate: {
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
        addons: {
            type:Array,
            default: []
        }
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
    },
    external_links: {
        twitter: {
            type:String,
            default: ''
        },
        instagram: {
            type:String,
            default: ''
        },
        youtube: {
            type:String,
            default: ''
        },
        tiktok: {
            type:String,
            default: ''
        },
        discord: {
            type:String,
            default: ''
        },
        reddit: {
            type:String,
            default: ''
        },
        facebook: {
            type:String,
            default: ''
        }
    },
    custom: {
        domain: {
            type:String,
            default: ''
        },
        alias: {
            type:String,
            default: ''
        }
    },
}, { timestamps: true });

exports.Website = mongoose.model('website', WebsitesSchema);