const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken } = require('../../middlewares/jwt');
const { PaymentRequestValidator } = require('../../middlewares/validators');

router.post('/', authenticateToken, PaymentRequestValidator, controller.requestPayment);

module.exports = router;