'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/gone
                                                                                                                                                           */

var Gone = function Gone(message, errorCode) {
  _classCallCheck(this, Gone);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Gone';
  this.statusCode = 410;
  this.errorCode = errorCode || 410;
};

_util2.default.inherits(Gone, Error);

exports.default = Gone;