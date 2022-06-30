const { generateAccessToken, generateRefreshToken, generateThirdPartyToken } = require('../../middlewares/jwt');
const { validationResult } = require('express-validator');
const { Member } = require('../../models/Members');
const { Token } = require('../../models/Tokens');
const jwt = require('jsonwebtoken');

exports.walletLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, wallet } = req.body;

        const userCount = await Member.count({ address })

        const newMember = {
            address,
            wallet
        }
        
        const member = new Member(newMember);

        if (!userCount) await member.save({ ordered: false });

        const memberData = { address, wallet };
        const accessToken = generateAccessToken(memberData);
        const refreshToken = generateRefreshToken(memberData);

        const tokenCount = await Token.findOne({ address });

        const newToken = new Token({
            address, 
            refreshToken
        });

        if (!tokenCount) await newToken.save({ ordered: false });
        else await Token.updateOne({ address }, {
            $set: {
                refreshToken
            }
        })

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

exports.addCount = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, service, value } = req.body;

        const child = {
            generator: 'generationCount',
            website: 'websiteCount'
        }[service];

        await Member.updateOne({ address }, {
            $inc: { 
                [`services.${service}.${child}`]: value
            }
        });

        res.status(200).json({message: "Succesfully added generation count to user"});

    } catch (err) {
        next(err);
    }
}

exports.addFree = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, service, value } = req.body;

        const child = {
            generator: 'freeGeneration',
            website: 'freeWebsite',
            utils: 'freeUtil'
        }[service];

        await Member.updateOne({ address }, 
            {
                $inc: { 
                    [`services.${service}.${child}`]: value
                }
            }
        );

        res.status(200).json({message: "Succesfully added points to user"});

    } catch (err) {
        next(err);
    }
}

exports.deductCount = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, service, value } = req.body;

        const child = {
            generator: 'generationCount',
            website: 'websiteCount'
        }[service];

        await Member.updateOne({ address }, {
            $inc: { 
                [`services.${service}.${child}`]: value * -1
            }
        });

        res.status(200).json({message: "Succesfully deducted points from user"});

    } catch (err) {
        next(err);
    }
}

exports.deductFree = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { address, service, value } = req.body;

        const child = {
            generator: 'freeGeneration',
            website: 'freeWebsite',
            utils: 'freeUtil'
        }[service];

        await Member.updateOne({ address }, {
            $inc: { 
                [`services.${service}.${child}`]: value * -1
            }
        });

        res.status(200).json({message: "Succesfully deducted points from user"});

    } catch (err) {
        next(err);
    }
}

exports.updateEmail = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { memberId, email } = req.body;

        const result = await Member.updateOne({ _id: memberId }, {
            $set: { 
                email
            }
        });

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.logout = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { refreshToken } = req.body;

        const result = await Token.deleteOne({ refreshToken });

        res.status(204).json(result);

    } catch (err) {
        next(err);
    }
}

exports.renewToken = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        const { refreshToken } = req.body;

        const tokenCount = await Token.count({ refreshToken });

        if (!tokenCount) return res.status(403).json({ message: 'Cannot fetch refresh token' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            const accessToken = generateAccessToken({ 
                address: data.address,
                wallet: data.wallet
            });

            res.json({ accessToken: accessToken });
        })

    } catch (err) {
        next(err);
    }
}