'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/unprocessableEntity
                                                                                                                                                           * @desc The 422 (Unprocessable Entity) status code means the server understands the content type of the request entity,
                                                                                                                                                           * and the syntax of the request entity is correct but was unable to process the contained instructions.
                                                                                                                                                           */

var UnprocessableEntity = function UnprocessableEntity(message, errorCode) {
  _classCallCheck(this, UnprocessableEntity);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Unprocessable Entity';
  this.statusCode = 422;
  this.errorCode = errorCode || 422;
};

_util2.default.inherits(UnprocessableEntity, Error);

exports.default = UnprocessableEntity;