var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

var container;
app.use(session({ 
  secret: '123456cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
app.disable('etag');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var expressRouter = require('./routes/warehouseExpress.js');
var updateRouter = require('./routes/update.js');
var addRouter = require('./routes/add.js');

app.use('/', expressRouter);
app.use('/update', updateRouter);
app.use('/add', addRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
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
