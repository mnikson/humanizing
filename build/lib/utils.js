'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.isValidEmail = exports.generatePassword = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * generate password
 *
 * @param {String}  password
 * @return {String} generated password
 */
var generatePassword = exports.generatePassword = function generatePassword(password) {
  try {
    if (!password) {
      throw new Error('Password is empty');
    }
    password = password + _config2.default.password.salt;
    var sha1sum = _crypto2.default.createHash('sha1');
    sha1sum.update(password);
    return sha1sum.digest('hex');
  } catch (err) {
    return err;
  }
};

/**
 * Validate email address
 * @param {string} email Email address for validation
 * @returns {boolean}
 */
/**
 * @file Common functions
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

var isValidEmail = exports.isValidEmail = function isValidEmail(email) {
  return _validator2.default.isEmail(email);
};

/**
 * Validate password input
 *
 * @param {String} password Password for validation
 * @returns {null | String}
 */
var validatePassword = exports.validatePassword = function validatePassword(password) {
  var error = null;

  if (password === '') {
    error = 'You didn\'t enter a password';
  } else if (_.size(password) > 15) {
    error = 'Password is longer then 15 characters';
  } else if (_.size(password) < 6) {
    error = 'Password must be 6 charachters at least';
  }

  return error;
};