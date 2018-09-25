'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/requestTimeout
                                                                                                                                                           */

var RequestTimeout = function RequestTimeout(message, errorCode) {
  _classCallCheck(this, RequestTimeout);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Request Timeout';
  this.statusCode = 408;
  this.errorCode = errorCode || 408;
};

_util2.default.inherits(RequestTimeout, Error);

exports.default = RequestTimeout;