const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Require Session
const session = require('express-session');
// Require Passport
const passport = require('passport');
// Require Method-Override
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

require('./config/db');
// Require Passport Config
require('./config/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const budgetsRouter = require('./routes/budgets');
const aboutRouter = require('./routes/about');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount Session
app.use(session({
  secret: 'secret-key-shhhh',
  resave: false,
  saveUninitialized: true
}));

// Mount Passport
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// Mount Method-Override
app.use(methodOverride('_method'));


// Mount Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', categoriesRouter);
app.use('/', budgetsRouter);
app.use('/', aboutRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
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