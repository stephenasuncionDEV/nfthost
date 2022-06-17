const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken, authenticateThirdPartyToken } = require('../../middlewares/jwt');
const { 
    CreateWebsiteValidator, 
    GetWebsiteValidator,
    GetWebsitesValidator,
    UpdateWebsiteValidator,
    DeleteWebsiteValidator,
    UpdateExpirationValidator,
    UpdateTemplateValidator,
    UpdateStyleValidator,
    UpdateRevealDateValidator,
    UpdateCustomValidator,
    UpdateAnalyticsValidator,
    UpdateComponentsValidator,
    DeleteAddonValidator,
    UpdateSubscriptionValidator
} = require('../../middlewares/validators');

router.post('/create', authenticateThirdPartyToken, CreateWebsiteValidator, controller.createWebsite);
router.get('/get', authenticateThirdPartyToken, GetWebsiteValidator, controller.getWebsite);
router.get('/getMany', authenticateToken, GetWebsitesValidator, controller.getWebsites);
router.put('/update', authenticateToken, UpdateWebsiteValidator, controller.updateWebsite);
router.delete('/delete', authenticateToken, DeleteWebsiteValidator, controller.deleteWebsite);
router.patch('/updateExpiration', authenticateThirdPartyToken, UpdateExpirationValidator, controller.updateExpiration);
router.patch('/updateTemplate', authenticateToken, UpdateTemplateValidator, controller.updateTemplate);
router.patch('/updateStyle', authenticateToken, UpdateStyleValidator, controller.updateStyle);
router.patch('/updateRevealDate', authenticateToken, UpdateRevealDateValidator, controller.updateRevealDate);
router.patch('/updateCustom', authenticateToken, UpdateCustomValidator, controller.updateCustom);
router.patch('/updateAnalytics', authenticateToken, UpdateAnalyticsValidator, controller.updateAnalytics);
router.patch('/updateComponents', authenticateToken, UpdateComponentsValidator, controller.updateComponents);
router.patch('/updateSubscription', authenticateToken, UpdateSubscriptionValidator, controller.updateSubscription);
router.delete('/deleteAddon', authenticateToken, DeleteAddonValidator, controller.deleteAddon);
router.get('/getFeatured', authenticateToken, controller.getFeatured);

module.exports = router;