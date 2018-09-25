'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _translate = require('../lib/translate');

var _translate2 = _interopRequireDefault(_translate);

var _errors = require('../lib/errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate authentication token
 * @param {string} username User's username to authenticate
 * @returns {string}
 */
/**
 * @file User Routes - list of all routes for user
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

var generateToken = exports.generateToken = function generateToken(username) {
  var token = _jsonwebtoken2.default.sign({ username: username }, _config2.default.token.salt, {
    expiresIn: _config2.default.token.expire
  });
  return token;
};

/**
 * Verify JWT token
 * @param {string} token 
 */

// import errors from '../lib/errors'
var verifyToken = exports.verifyToken = function verifyToken(token) {
  try {
    var decoded = _jsonwebtoken2.default.verify(token, _config2.default.token.salt);

    return decoded;
  } catch (err) {
    return new _errors.Unauthorized(_translate2.default.__('Invalid token'));
  }
};