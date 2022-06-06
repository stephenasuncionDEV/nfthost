const router = require('express').Router();
const controller = require('./controller');
const { 
    WalletLoginValidator, 
    GetMemberByAddressValidator,
    AddCountValidator, 
    AddFreeValidator,
    DeductFreeValidator
} = require('../../middlewares/validators');
const { authenticateToken } = require('../../middlewares/jwt');

router.post('/walletLogin', WalletLoginValidator, controller.walletLogin);
router.get('/getByAddress', authenticateToken, GetMemberByAddressValidator, controller.getMemberByAddress);
router.patch('/addCount', authenticateToken, AddCountValidator, controller.addCount);
router.patch('/addFree', authenticateToken, AddFreeValidator, controller.addFree);
router.patch('/deductFree', authenticateToken, DeductFreeValidator, controller.deductFree);

module.exports = router;