'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/gatewayTimeout
                                                                                                                                                           */

var GatewayTimeout = function GatewayTimeout(message, errorCode) {
  _classCallCheck(this, GatewayTimeout);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Gateway Timeout';
  this.statusCode = 504;
  this.errorCode = errorCode || 504;
};

_util2.default.inherits(GatewayTimeout, Error);

exports.default = GatewayTimeout;