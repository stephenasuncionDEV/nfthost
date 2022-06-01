const router = require('express').Router();
const controller = require('./controller');
const { WalletLoginValidator, GetMemberByAddressValidator } = require('../../middlewares/validators');
const { authenticateToken } = require('../../middlewares/jwt');

router.post('/walletLogin', WalletLoginValidator, controller.walletLogin);
router.get('/getByAddress', authenticateToken, GetMemberByAddressValidator, controller.getMemberByAddress);

module.exports = router;