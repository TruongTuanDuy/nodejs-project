var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const { error, log } = require('console');

require('./src/app/init_db');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes')); //thực chất là: app.use('/', require('./src/routes/index.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // kiểm tra lỗi mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    console.error('Mongoose Validation Error:', err.message);
    var errorObj = {};
    // Extract validation errors
    for (let field in err.errors) {
      console.error(`Field '${field}': ${err.errors[field].message}`);
      errorObj[field] = err.errors[field].message;
    }
    res.status(400).send(errorObj);
    return
  }
  // render the error page
  res.status(err.status || 500);
  res.send({
    'message': err.message
  })
});

module.exports = app;
