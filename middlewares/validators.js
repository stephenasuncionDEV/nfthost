const crypto = require('crypto');
const { check } = require("express-validator");

const createComparisonSignature = (body, secret) => {
    const hmac = crypto.createHmac('sha1', secret);
    const self_signature = hmac.update(JSON.stringify(body)).digest('hex');
    return `sha1=${self_signature}`;
}

const compareSignatures = (signature, comparison_signature) => {
    const source = Buffer.from(signature);
    const comparison = Buffer.from(comparison_signature);
    return crypto.timingSafeEqual(source, comparison);
}

module.exports.verifyGithubPayload = (req, res, next) => {
    const { headers, body } = req;

    const signature = headers['x-hub-signature'];
    const comparison_signature = createComparisonSignature(body, process.env.WEBHOOK_SECRET);

    if (!compareSignatures(signature, comparison_signature)) {
        return res.status(401).send('Mismatched signatures');
    }

    const { action, ...payload } = body;
    req.event_type = headers['x-github-event'];
    req.action = action;
    req.payload = payload;
    next();
}