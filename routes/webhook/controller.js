const { Log } = require('../../models/Logs');
const { NFTError } = require('../../middlewares/errorHandler');

exports.receive = (req, res, next) => {
    try {
        const data = req.body;
        let commitArr = [];
        data.commits.forEach((commit) => {
            commitArr.push(commit.message);
        });
        const newLog = {
            hash: data.head_commit.id,
            date: data.head_commit.timestamp,
            author: data.pusher.name,
            body: commitArr
        }
        const log = new Log(newLog);
        log.save()
        .then(response => {
            res.status(200).json({message: "Log successfully added"});
        })
        .catch(err => {
            throw new NFTError(err.message, 400);
        });
    } catch (err) {
        next(err);
    }
}

exports.retrieve = (req, res, next) => {
    try {
        let length = 0;
        Log.find({}).count()
        .then(count => {
            length = count;
            return Log.find({}).limit(3).sort({ date : -1 });
        })
        .then(results => {
            const data = results.map((result, index) => ({
                ...result._doc,
                index: length - index
            }));
            res.json(data);
        })
        .catch(err => {
            throw new NFTError(err.message, 400);
        });
    } catch (err) {
        next(err);
    }
}