const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.requestPayment);

module.exports = router;