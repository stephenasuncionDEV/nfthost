const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken } = require('../../middlewares/jwt');
const { 
    CreateWebsiteValidator, 
    GetWebsiteValidator,
    GetWebsitesValidator,
    UpdateWebsiteValidator
} = require('../../middlewares/validators');

router.post('/create', authenticateToken, CreateWebsiteValidator, controller.createWebsite);
router.get('/get', authenticateToken, GetWebsiteValidator, controller.getWebsite);
router.get('/getMany', authenticateToken, GetWebsitesValidator, controller.getWebsites);
router.put('/update', authenticateToken, UpdateWebsiteValidator, controller.updateWebsite);

module.exports = router;