const { generateAccessToken, generateRefreshToken } = require('../../middlewares/jwt');
const { validationResult } = require('express-validator');
const { Website } = require('../../models/Websites');
// const bcrypt = require ('bcrypt');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');

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
        
        const result = await Website.find({ _id: websiteId });

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

        const result = await Website.updateOne({ _id: websiteId }, {
            ...websiteData
        })

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}