'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/BadRequest
                                                                                                                                                           */

var BadRequest = function BadRequest(message, errorCode) {
  _classCallCheck(this, BadRequest);

  Error.captureStackTrace(this, this.constructor);

  this.name = 'BadRequest';
  this.message = message || 'Bad Request';
  this.statusCode = 400;
  this.errorCode = errorCode || 400;
};

_util2.default.inherits(BadRequest, Error);

exports.default = BadRequest;