const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken } = require('../../middlewares/jwt');
const { PaymentRequestValidator, AddPaymentValidator } = require('../../middlewares/validators');

router.post('/request', authenticateToken, PaymentRequestValidator, controller.requestPayment);
router.post('/add', authenticateToken, AddPaymentValidator, controller.addPayment);

module.exports = router;