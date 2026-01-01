var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./src/app/core/init_logger');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
require('./src/app/core/init_db');
require('./src/app/core/init_redis');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
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
  console.log(req.url, req.method);
  let log = `${req.method} ${req.url} - ${err.message}-${new Date().toString()}`;
  logger.error(log);
  res.status(err.status || 500);
  res.send({
    'message': err.message
  })
});

module.exports = app;
