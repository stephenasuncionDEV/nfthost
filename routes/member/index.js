const router = require('express').Router();
const controller = require('./controller');
const { 
    WalletLoginValidator, 
    GetMemberByAddressValidator,
    AddCountValidator, 
    AddFreeValidator,
    DeductCountValidator,
    DeductFreeValidator,
    UpdateEmailValidator
} = require('../../middlewares/validators');
const { authenticateToken } = require('../../middlewares/jwt');

router.post('/walletLogin', WalletLoginValidator, controller.walletLogin);
router.get('/getByAddress', authenticateToken, GetMemberByAddressValidator, controller.getMemberByAddress);
router.patch('/addCount', authenticateToken, AddCountValidator, controller.addCount);
router.patch('/addFree', authenticateToken, AddFreeValidator, controller.addFree);
router.patch('/deductCount', authenticateToken, DeductCountValidator, controller.deductCount);
router.patch('/deductFree', authenticateToken, DeductFreeValidator, controller.deductFree);
router.patch('/updateEmail', authenticateToken, UpdateEmailValidator, controller.updateEmail);

module.exports = router;