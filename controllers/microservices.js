var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.3.8.231:1883');
var request = require('request');
var options = {
	headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
	},
  	uri: 'http://1002.apexsupplychain.com/qa3/device/services',
  	method: 'POST',
  	json: {
		"messageType": "209",
    	"deviceSN": "DEVTYPE90003"
	}
};

client.subscribe('LED');

exports.turnOnLed = function(req, res){
	client.publish('LED', 'turnOnLed');
	res.status(200).json({'message': 'turnOnLed'});
}

exports.turnOffLed = function(req, res){
	client.publish('LED', 'turnOffLed');
	res.status(200).json({'message': 'turnOffLed'});
}

exports.trajectory = function(io){
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log("trajectory is working!");
	    client.publish('LED', 'turnOnLed');
	    io.sockets.emit ('turnOff', 'success');
	  }
	});
}