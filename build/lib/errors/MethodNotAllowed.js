'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/methodNotAllowed
                                                                                                                                                           */

var MethodNotAllowed = function MethodNotAllowed(message, errorCode) {
  _classCallCheck(this, MethodNotAllowed);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Method Not Allowed';
  this.statusCode = 405;
  this.errorCode = errorCode || 405;
};

_util2.default.inherits(MethodNotAllowed, Error);

exports.default = MethodNotAllowed;