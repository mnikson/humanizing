'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventEmitter = undefined;

var _events = require('events');

var eventEmitter = exports.eventEmitter = new _events.EventEmitter(); /**
                                                                       * @file Event emitter service
                                                                       * @author Nikola Miljkovic <mnikson@gmail.com>
                                                                       * @version 1.0
                                                                       */

eventEmitter.on('authenticate', function (user) {
  console.log('user ' + user.name + ' is logged in');
});

exports.default = eventEmitter;