var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.3.8.212:1883');

exports.turnOnOffLed = function(req, res){
	client.subscribe('LED');

	console.log('Client publishing.. ');
	client.publish('LED', 'Client 1 is alive... Turning ligth! ' + Date());

	res.status(200).json({'message': 'Client 1 is alive... Turning ligth!'});
}