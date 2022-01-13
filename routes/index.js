const router = require('express').Router();
const payment = require('./payment');
const webhook = require('./webhook');

router.use('/payment', payment);
router.use('/webhook', webhook);

module.exports = router;