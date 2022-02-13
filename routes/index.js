const router = require('express').Router();
const payment = require('./payment');
const webhook = require('./webhook');
const user = require('./user');

router.use('/payment', payment);
router.use('/webhook', webhook);
router.use('/user', user);

module.exports = router;