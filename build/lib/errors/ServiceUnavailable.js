'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/serviceUnavailable
                                                                                                                                                           */

var ServiceUnavailable = function ServiceUnavailable(message, errorCode) {
  _classCallCheck(this, ServiceUnavailable);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Service Unavailable';
  this.statusCode = 503;
  this.errorCode = errorCode || 503;
};

_util2.default.inherits(ServiceUnavailable, Error);

exports.default = ServiceUnavailable;