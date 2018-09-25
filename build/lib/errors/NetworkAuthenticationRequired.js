'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/networkAuthenticationRequired
                                                                                                                                                           * @desc  The client needs to authenticate to gain network access.
                                                                                                                                                           * Intended for use by intercepting proxies used to control access to the network.
                                                                                                                                                           */

var NetworkAuthenticationRequired = function NetworkAuthenticationRequired(message, errorCode) {
  _classCallCheck(this, NetworkAuthenticationRequired);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Network Authentication Required';
  this.statusCode = 511;
  this.errorCode = errorCode || 511;
};

_util2.default.inherits(NetworkAuthenticationRequired, Error);

exports.default = NetworkAuthenticationRequired;