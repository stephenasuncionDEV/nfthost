const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.createUser);
router.post('/update', controller.updateUser);
router.get('/get', controller.getUser);

module.exports = router;