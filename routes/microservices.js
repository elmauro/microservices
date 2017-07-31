var express = require('express');
var router = express.Router();
var MicroCtrl = require('../controllers/microservices');

router.post('/turnOnOffLed', MicroCtrl.turnOnOffLed);
module.exports = router;
