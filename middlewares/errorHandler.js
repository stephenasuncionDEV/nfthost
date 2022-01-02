class NFTError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.status = statusCode;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else { 
            this.stack = (new Error(message)).stack; 
        }
    }
}
module.exports.NFTError = NFTError;

module.exports.errorHandler = (err, req, res, next) => {
    const {statusCode = 500, message, data} = err;
    res.status(statusCode).json({ message, error:data });
}