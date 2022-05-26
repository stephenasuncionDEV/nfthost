const router = require('express').Router();
const controller = require('./controller');
// const { WalletLoginValidator } = require('../../middlewares/validators');
const { authenticateToken } = require('../../middlewares/jwt');

// router.post('/', controller.createUser);
// router.post('/update', controller.updateUser);
// router.get('/get', controller.getUser);

module.exports = router;