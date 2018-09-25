'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = undefined;

var _translate = require('../lib/translate');

var _translate2 = _interopRequireDefault(_translate);

var _auth = require('../services/auth.service');

var _errors = require('../lib/errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Authenticate user by token
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 */

// Services
var authentication = exports.authentication = function authentication(req, res, next) {
  try {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // if token missing
    if (!token) {
      var err = new _errors.Unauthorized(_translate2.default.__('No token provided'));
      throw err;
    }

    // verify token
    var decoded = (0, _auth.verifyToken)(token);

    if (decoded instanceof Error) {
      return res.status(decoded.statusCode).json(decoded);
    }

    req.decoded = decoded;

    next();
  } catch (err) {
    throw err;
  }
}; /**
    * @file Middleware for authorization
    * @author Nikola Miljkovic <mnikson@gmail.com>
    * @version 1.0
    */

// Libraries
// import errors from '../lib/errors'