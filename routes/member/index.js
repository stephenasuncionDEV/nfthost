const router = require('express').Router();
const controller = require('./controller');
const { 
    WalletLoginValidator, 
    GetMemberByAddressValidator,
    AddGenerationCountValidator, 
    AddGenerationValidator,
    DeductGenerationValidator
} = require('../../middlewares/validators');
const { authenticateToken } = require('../../middlewares/jwt');

router.post('/walletLogin', WalletLoginValidator, controller.walletLogin);
router.get('/getByAddress', authenticateToken, GetMemberByAddressValidator, controller.getMemberByAddress);
router.patch('/addGenerationCount', authenticateToken, AddGenerationCountValidator, controller.addGenerationCount);
router.patch('/addGeneration', authenticateToken, AddGenerationValidator, controller.addGeneration);
router.patch('/deductGeneration', authenticateToken, DeductGenerationValidator, controller.deductGeneration);

module.exports = router;