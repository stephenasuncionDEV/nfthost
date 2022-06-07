const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

module.exports.generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
}

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Invalid access token' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: 'Your access token has expired please re-log in', isExpired: true });
        next();
    })
}