const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebsitesSchema = new Schema({
    memberId: {
        type:String, 
        required:true,
        unique:true
    },
    components: {
        title: {
            type:String,
            default: ''
        },
        unrevealedImage: {
            type:String,
            default: ''
        },
        description: {
            type:String,
            default: ''
        },
        embed : {
            type:String,
            default: ''
        },
        isPremium : {
            type:Boolean,
            default: false
        },
        meta: {
            title: {
                type:String,
                default: ''
            },
            description: {
                type:String,
                default: ''
            },
            robot: {
                type:String,
                default: ''
            },
            favicon: {
                type:String,
                default: ''
            },
            language: {
                type:String,
                default: ''
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
    },
}, { timestamps: true });

exports.Website = mongoose.model('website', WebsitesSchema);