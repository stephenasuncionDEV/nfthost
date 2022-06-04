const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken } = require('../../middlewares/jwt');
const {  } = require('../../middlewares/validators');

// router.post('/', authenticateToken, controller.requestPayment);

module.exports = router;