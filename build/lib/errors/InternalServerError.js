'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/internalServerError
                                                                                                                                                           */

var InternalServerError = function InternalServerError(message, errorCode) {
  _classCallCheck(this, InternalServerError);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Internal Server Error';
  this.statusCode = 500;
  this.errorCode = errorCode || 500;
};

_util2.default.inherits(InternalServerError, Error);

exports.default = InternalServerError;