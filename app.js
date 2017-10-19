'use strict';

// Express is a minimal and flexible Node.js web application framework
// that provides a robust set of features for web and mobile applications.
const express = require('express');
// The path module provides utilities for working with file and directory paths.
const path = require('path');
// HTTP request logger middleware for node.js
const logger = require('morgan');
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const cookieParser = require('cookie-parser');
// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
const bodyParser = require('body-parser');

function create(endpoints) {

  const app = express();

  // view engine setup
  // This defaults to the views directory in the application root directory.
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  if (endpoints.index) {
    app.use('/', endpoints.index);
  }
  if (endpoints.chuckEndpoint) {
    app.use('/', endpoints.chuckEndpoint);
  }

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
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

  return app;
}

module.exports = create;