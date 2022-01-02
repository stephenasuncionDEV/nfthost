const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.receive);

router.get('/get', controller.retrieve);

module.exports = router;