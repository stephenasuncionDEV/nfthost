const { validationResult } = require('express-validator');
const { Website } = require('../../models/Websites');

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
        
        const result = await Website.findOne({ _id: websiteId });

        res.status(200).json(result);

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

        const result = await Website.remove({ _id: websiteId });

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

        res.status(200).json({message: "Succesfully updated website expiration"});


    } catch (err) {
        next(err);
    }
}