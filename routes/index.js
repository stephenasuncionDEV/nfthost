const router = require('express').Router();
const payment = require('./payment');
const member = require('./member');

router.use('/payment', payment);
router.use('/member', member);

module.exports = router;