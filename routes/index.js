const router = require('express').Router();
const webhook = require('./webhook');

router.use('/webhook', webhook);

module.exports = router;