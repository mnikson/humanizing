'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/badGateway
                                                                                                                                                           */

var BadGateway = function BadGateway(message, errorCode) {
  _classCallCheck(this, BadGateway);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Bad Gateway';
  this.statusCode = 502;
  this.errorCode = errorCode || 502;
};

_util2.default.inherits(BadGateway, Error);

exports.default = BadGateway;