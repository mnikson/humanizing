'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @module errors/failedDependency
                                                                                                                                                           * @desc  The 424 (Failed Dependency) status code means that the method could
                                                                                                                                                           not be performed on the resource because the requested action
                                                                                                                                                           depended on another action and that action failed.
                                                                                                                                                           */

var FailedDependency = function FailedDependency(message, errorCode) {
  _classCallCheck(this, FailedDependency);

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Failed Dependency';
  this.statusCode = 424;
  this.errorCode = errorCode || 424;
};

_util2.default.inherits(FailedDependency, Error);

exports.default = FailedDependency;