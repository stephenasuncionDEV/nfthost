const { validationResult } = require('express-validator');
const { Website } = require('../../models/Websites');
const { ParseWebsiteData, EncodeWebsiteData, VerifyDns } = require('../../middlewares/tools');

const ObjectId = require('mongoose').Types.ObjectId;

exports.createWebsite = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const website = new Website({...req.body});
        const result = await website.save({ ordered: false });

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.getWebsite = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);
        
        const { websiteId } = req.query;

        let count = 0;
        
        // Check if websiteId is an actual object id
        if (ObjectId.isValid(websiteId)) {
            count = await Website.count({ _id: websiteId });
            if (count > 0) {
                const result = await Website.findOne({ _id: websiteId });
                res.status(200).json(result);
                return;
            }
        }

        const tempId = websiteId.toLowerCase();
        const expression = { $regex: new RegExp('^' + tempId + '$', 'i') };

        // // Check if websiteId is a custom domain
        // count = await Website.count({ [`custom.domain`]: expression });
        // if (count > 0) {
        //     const result = await Website.findOne({ [`custom.domain`]: expression });
        //     res.status(200).json(result);
        //     return;
        // }

        // Check if websiteId is a custom alias
        count = await Website.count({ [`custom.alias`]: expression });
        if (count > 0) {
            const result = await Website.findOne({ [`custom.alias`]: expression });
            res.status(200).json(result);
            return;
        }

    } catch (err) {
        next(err);
    }
}

//@Todo
exports.getWebsiteByDomain = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);
        
        const { domain } = req.query;

        let result;

        if (domain.indexOf('www.') === -1) { // If alias
            
        }
        else { // If cname
            
        }

        res.status(200).json(result);

        //const tempDomain = domain.toLowerCase();

        // const expression = { $regex: new RegExp('^' + tempDomain + '$', 'i') };

        // // Check if websiteId is a custom domain
        // count = await Website.count({ [`custom.domain`]: expression });
        // if (count > 0) {
        //     const result = await Website.findOne({ [`custom.domain`]: expression });
        //     res.status(200).json(result);
        //     return;
        // }

        // Check if websiteId is a custom alias
        // count = await Website.count({ [`custom.alias`]: expression });
        // if (count > 0) {
        //     const result = await Website.findOne({ [`custom.alias`]: expression });
        //     res.status(200).json(result);
        //     return;
        // }

    } catch (err) {
        next(err);
    }
}

exports.getWebsites = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { memberId } = req.query;

        const result = await Website.find({ memberId });

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.getFeatured = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const result = await Website.aggregate([{$sample: {size: 5}}]);

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.updateWebsite = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, ...websiteData} = req.body;

        await Website.updateOne({ _id: websiteId }, {
            ...websiteData
        })

        res.status(200).json({
            _id: websiteId,
            ...websiteData
        });

    } catch (err) {
        next(err);
    }
}

exports.deleteWebsite = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId } = req.body;

        const result = await Website.deleteOne({ _id: websiteId });

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.updateExpiration = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, isExpired } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                isExpired
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.updateTemplate = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, template } = req.body;

        const currentWebsite = await Website.findOne({ _id: websiteId });

        if (!currentWebsite) throw new Error('Cannot fetch website');

        let decompressedObj = ParseWebsiteData(currentWebsite.data);

        if (!decompressedObj) throw new Error('Cannot decompress data');

        decompressedObj.template = template;

        const compressed = EncodeWebsiteData(decompressedObj);

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                data: compressed
            }
        });

        res.status(200).json({ data: compressed });

    } catch (err) {
        next(err);
    }
}

exports.updateStyle = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, style } = req.body;

        const currentWebsite = await Website.findOne({ _id: websiteId });

        if (!currentWebsite) throw new Error('Cannot fetch website');

        let decompressedObj = ParseWebsiteData(currentWebsite.data);

        if (!decompressedObj) throw new Error('Cannot decompress data');

        decompressedObj.style = style;

        const compressed = EncodeWebsiteData(decompressedObj);

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                data: compressed
            }
        });

        res.status(200).json({ data: compressed });

    } catch (err) {
        next(err);
    }
}

exports.updateRevealDate = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, revealDate } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                revealDate
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.updateCustom = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, key, value } = req.body;

        const tempValue = value.toLowerCase();

        const resultCount = await Website.count({ [`custom.${key}`]: tempValue });

        if (resultCount > 0) throw new Error('Alias already in used');

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                [`custom.${key}`]: tempValue
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.updateAnalytics = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, key, value } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                [`analytics.${key}`]: value
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.updateComponents = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, key, value } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                [`components.${key}`]: value
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.deleteAddon = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, addon } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                ['components.addons']: addon
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.updateSubscription = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, isPremium, premiumStartDate } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                isPremium,
                premiumStartDate
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.renewSubscription = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, isExpired, premiumStartDate } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                isExpired,
                premiumStartDate
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}

exports.verifyDomain = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { domain } = req.body;

        const result = await VerifyDns(domain);

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.updateExternalLink = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { websiteId, external_links } = req.body;

        await Website.updateOne({ _id: websiteId }, {
            $set: { 
                external_links
            }
        });

        res.sendStatus(200);

    } catch (err) {
        next(err);
    }
}