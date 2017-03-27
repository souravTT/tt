// Enviourment variables
require('dotenv').config();

// Logger loading...
var logger = require('./config/logger')
// dependency library
logger.info("configuring express....")

const express = require('express')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const morgan  = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var RedisStore = require('connect-redis')(session)
const _ = require('lodash')
const expressHelper= require('express-helpers')
const app = express()

// app config
app.set('port', port)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({
	store: new RedisStore(),
	secret: 'pta nhi kuch hoga secret code',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))
// for logger
app.use(morgan('combined', logger.stream))

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', 'layouts/app');


// Middleware
app.use(function(req, res, next){
	date = new Date()
	// logger.info(date.toISOString() +"   "+ req.url + "  Respose STATUS   "+ res.statusCode);
	next();
})


// Routes setup
var routes = require('./config/routes');
app.use(routes);

app.listen(app.get('port'), () => {
	logger.info('Server running at port '+ app.get('port'));
})