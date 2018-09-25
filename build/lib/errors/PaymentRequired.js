'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/paymentRequired
                                                                                                                                                           */

var PaymentRequired = function PaymentRequired(message, errorCode) {
  _classCallCheck(this, PaymentRequired);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Payment Required';
  this.statusCode = 402;
  this.errorCode = errorCode || 402;
};

_util2.default.inherits(PaymentRequired, Error);

exports.default = PaymentRequired;