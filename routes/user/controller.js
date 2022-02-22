const { NFTError } = require('../../middlewares/errorHandler');
const { User } = require('../../models/Users');

exports.createUser = async (req, res, next) => {
    try {
        const { address } = req.body;
        const newUser = {
            address,
            generationCount: 0,
        }
        const user = new User(newUser);
        const userCount = await User.count({ 'address': address })
        if (userCount > 0) res.status(200).json({message: "User already created"})
        else {
            const res = await user.save({ ordered: false });
            res.status(200).json({message: "User successfully updated"});
        }
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { address, count } = req.body;
        await User.updateOne({ address }, {
            generationCount: count
        });
        res.status(200).json({message: "User successfully updated"});

    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const { address } = req.query;
        
        const user = await User.findOne({ address });

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}