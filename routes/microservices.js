var express = require('express');
var router = express.Router();
var MicroCtrl = require('../controllers/microservices');

router.post('/turnOnLed', MicroCtrl.turnOnLed);
router.post('/turnOffLed', MicroCtrl.turnOffLed);

module.exports = router;
