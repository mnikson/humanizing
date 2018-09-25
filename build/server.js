'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _log = require('./services/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// include local .env file
require('dotenv').config();

/**
 * Log
 */
/**
 * @file Setup the server
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

_log2.default.on('finish', function () {
  return process.exit();
});

/**
 * Server
 */
var server = (0, _express2.default)();

global.server = server;

server.use(function (req, res, next) {
  res.etag = '' + req.method + req.url;
  res.header('Etag', res.etag);
  res.header('Last-Modified', Date.parse(new Date()));
  res.setHeader('content-type', 'application/json');

  return next();
});

/**
 * Middleware
 */
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(function (req, res, next) {
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  next();
});

/**
 * Default response headers
 */
server.use(function (req, res, next) {
  res.setHeader('Server', _config2.default.name);
  next();
});

exports.default = server;