'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/proxyAuthenticationRequired
                                                                                                                                                           */

var ProxyAuthenticationRequired = function ProxyAuthenticationRequired(message, errorCode) {
  _classCallCheck(this, ProxyAuthenticationRequired);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Proxy Authentication Required';
  this.statusCode = 407;
  this.errorCode = errorCode || 407;
};

_util2.default.inherits(ProxyAuthenticationRequired, Error);

exports.default = ProxyAuthenticationRequired;