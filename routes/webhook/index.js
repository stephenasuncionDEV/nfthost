const router = require('express').Router();
const controller = require('./controller');
const { verifyGithubPayload } = require('../../middlewares/validators');

router.get('/get', controller.retrieve);

router.use('/', verifyGithubPayload);
router.post('/', controller.receive);

module.exports = router;