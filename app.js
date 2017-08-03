var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = require('./controllers/microservices');

var index = require('./routes/index');
var users = require('./routes/users');
var microservices = require('./routes/microservices');

var mqtt = require('mqtt');
var socket_io    = require( "socket.io" );
var app = express();
var io = socket_io();

app.io = io;

var client  = mqtt.connect('mqtt://10.3.8.231:1883');
client.subscribe('LED');

io.on('connection', function(socket){
  console.log("connection");
});


client.on('message', function(topic, message) {
  _message =  message.toString();

  switch(_message){
      case 'turnOn':  api.trajectory(io);
                      break; 
  }

});

var client  = mqtt.connect('mqtt://10.3.8.212:1883');
var _message;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/microservices', microservices);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
