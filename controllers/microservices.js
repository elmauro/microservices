var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.3.8.212:1883');

exports.turnOnLed = function(req, res){
	client.subscribe('LED');

	client.publish('LED', 'turnOnLed');

	res.status(200).json({'message': 'turnOnLed'});
}

exports.turnOffLed = function(req, res){
	client.subscribe('LED');

	client.publish('LED', 'turnOffLed');

	res.status(200).json({'message': 'turnOffLed'});
}