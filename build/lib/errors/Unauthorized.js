'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/unauthorizedRequest
                                                                                                                                                           */

var Unauthorized = function Unauthorized(message, errorCode) {
  _classCallCheck(this, Unauthorized);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Unauthorized Request';
  this.statusCode = 401;
  this.errorCode = errorCode || 401;
};

_util2.default.inherits(Unauthorized, Error);

exports.default = Unauthorized;