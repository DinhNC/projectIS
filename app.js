var cors                    = require('cors');
var express                 = require('express');
var path					= require('path');
var favicon					= require('static-favicon');
var logger					= require('morgan');
var bodyParser				= require('body-parser');
var expressSession			= require('express-session');
var cookieParser			= require('cookie-parser');
var busboy					= require('connect-busboy');


var socialTrend 			= require('./router/socialtrend');

var DataControl				= require('./router/DataControl');

var app     = express();
var server 	= require('http').Server(app);
var io 		= require('socket.io')(server);
io.on('connection', function (socket) {
   
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb'}));
app.use(bodyParser({ uploadDir: path.join(__dirname, '/public/data/'), keepExtensions: true })); 
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());


app.use('/', socialTrend);
app.use('/dataset', DataControl);


module.exports = {
    app     : app,
    server  : server
};
