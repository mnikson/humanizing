'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/forbidden
                                                                                                                                                           */

var Forbidden = function Forbidden(message, errorCode) {
  _classCallCheck(this, Forbidden);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Forbidden';
  this.statusCode = 403;
  this.errorCode = errorCode || 403;
};

_util2.default.inherits(Forbidden, Error);

exports.default = Forbidden;