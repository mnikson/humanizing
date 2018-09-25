'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/notImplemented
                                                                                                                                                           */

var NotImplemented = function NotImplemented(message, errorCode) {
  _classCallCheck(this, NotImplemented);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Not Implemented';
  this.statusCode = 501;
  this.errorCode = errorCode || 501;
};

_util2.default.inherits(NotImplemented, Error);

exports.default = NotImplemented;