const { generateAccessToken, generateRefreshToken } = require('../../middlewares/jwt');
const { validationResult } = require('express-validator');
const { Member } = require('../../models/Members');
// const bcrypt = require ('bcrypt');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');

exports.walletLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, wallet } = req.body;

        const userCount = await Member.count({ address })

        if (!userCount) {
            const newMember = {
                address,
                wallet
            }
            
            const member = new Member(newMember);
            await member.save({ ordered: false });
        }

        const memberData = { address, wallet };
        const accessToken = generateAccessToken(memberData);
        const refreshToken = generateRefreshToken(memberData);

        res.status(200).json({ accessToken, refreshToken });

    } catch (err) {
        next(err);
    }
}

exports.getMemberByAddress = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address } = req.query;

        const member = await Member.findOne({ address });

        res.status(200).json(member);

    } catch (err) {
        next(err);
    }
}

exports.addGenerationCount = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, value } = req.body;

        await Member.updateOne({ address }, {
            $inc: { 
                ['services.generator.generationCount']: value
            }
        });

        res.status(200).json({message: "Succesfully added generation count to user"});

    } catch (err) {
        next(err);
    }
}

exports.addGeneration = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, value } = req.body;

        await Member.updateOne({ address }, {
            $inc: { 
                ['services.generator.freeGeneration']: value
            }
        });

        res.status(200).json({message: "Succesfully added points to user"});

    } catch (err) {
        next(err);
    }
}

exports.deductGeneration = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, value } = req.body;

        await Member.updateOne({ address }, {
            $inc: { 
                ['services.generator.freeGeneration']: value * -1
            }
        });

        res.status(200).json({message: "Succesfully deducted points from user"});

    } catch (err) {
        next(err);
    }
}