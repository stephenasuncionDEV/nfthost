const router = require('express').Router();
const host = require('./host');
const webhook = require('./webhook');

router.use('/host', host);
router.use('/webhook', webhook);

module.exports = router;