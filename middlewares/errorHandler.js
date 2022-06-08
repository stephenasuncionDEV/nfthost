module.exports.errorHandler = (err, req, res, next) => {
    const { status } = err;
    res.status(status | 500).json({status: err.status, message: err.message});
}