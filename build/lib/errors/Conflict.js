'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/conflict
                                                                                                                                                           */

var Conflict = function Conflict(message, errorCode) {
  _classCallCheck(this, Conflict);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Conflict';
  this.statusCode = 409;
  this.errorCode = errorCode || 409;
};

_util2.default.inherits(Conflict, Error);

exports.default = Conflict;