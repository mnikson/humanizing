'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/httpVersionNotSupported
                                                                                                                                                           */

var HttpVersionNotSupported = function HttpVersionNotSupported(message, errorCode) {
  _classCallCheck(this, HttpVersionNotSupported);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'HTTP Version Not Supported';
  this.statusCode = 505;
  this.errorCode = errorCode || 505;
};

_util2.default.inherits(HttpVersionNotSupported, Error);

exports.default = HttpVersionNotSupported;