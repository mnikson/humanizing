'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _errors = require('../lib/errors');

var _translate = require('../lib/translate');

var _translate2 = _interopRequireDefault(_translate);

var _utils = require('../lib/utils');

var _auth = require('../services/auth.service');

var _event = require('../services/event.service');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file Controller for user
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author Nikola Miljkovic <mnikson@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @version 1.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// Models

// Library

// Services


/**
 * Authenticate user
 * @param {string} username User's username
 * @param {string} password User's password
 */
exports.authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password) {
    var user, isMatch, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user2.default.findOne({ username: username }).exec();

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            throw new _errors.UnprocessableEntity(_translate2.default.__('User not found'));

          case 6:
            _context.next = 8;
            return user.comparePassword(password);

          case 8:
            isMatch = _context.sent;

            if (isMatch) {
              _context.next = 11;
              break;
            }

            throw new _errors.Unauthorized(_translate2.default.__('Authentication failed. Wrong username or password'));

          case 11:

            // emit event for log, sending email or other
            _event2.default.emit('authenticate', user);

            token = (0, _auth.generateToken)(username);
            return _context.abrupt('return', {
              status: true,
              token: token
            });

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get active users
 * @param {number} page
 * @param {number} limit
 * @param {string} sort
 * @returns {Promise.<*>}
 */
exports.activeUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config2.default.paginate.per_page;
  var sort = arguments[2];
  var order = arguments[3];
  var options, orderValue, users;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          options = {
            limit: limit,
            page: page
            // sort users
          };
          if (sort) {
            orderValue = order == 'asc' ? -1 : 1;

            options.sort = {};
            options.sort[sort] = orderValue;
          }

          _context2.next = 5;
          return _user2.default.paginate({ active: true }, options);

        case 5:
          users = _context2.sent;
          return _context2.abrupt('return', users);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2['catch'](0);
          throw _context2.t0;

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined, [[0, 9]]);
}));

/**
 * Create new user
 * @param {object} data
 * @returns {Promise.<*>}
 */
exports.createUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var newUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!(!data.username || !data.name || !data.email || !data.name || !data.password)) {
              _context3.next = 3;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Insert valid user data'));

          case 3:
            if (!(!data || Object.keys(data).length === 0)) {
              _context3.next = 5;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Insert valid user data'));

          case 5:
            if (!(data.email && !(0, _utils.isValidEmail)(data.email))) {
              _context3.next = 7;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Email is not valid'));

          case 7:
            _context3.next = 9;
            return _user2.default.create(data);

          case 9:
            newUser = _context3.sent;
            return _context3.abrupt('return', newUser);

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);
            throw _context3.t0;

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 13]]);
  }));

  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update user
 * @param {string} id
 * @param {object} data
 * @returns {Promise.<*>}
 */
exports.updateUser = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (!(!data || Object.keys(data).length === 0)) {
              _context4.next = 3;
              break;
            }

            throw new _errors.UnprocessableEntity(_translate2.default.__('Update data missing'));

          case 3:
            if (!(data.email && !(0, _utils.isValidEmail)(data.email))) {
              _context4.next = 5;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Email is not valid'));

          case 5:
            _context4.next = 7;
            return _user2.default.findByIdAndUpdate(id, data, { new: true });

          case 7:
            user = _context4.sent;

            if (user) {
              _context4.next = 10;
              break;
            }

            throw new _errors.UnprocessableEntity(_translate2.default.__('User not found'));

          case 10:
            return _context4.abrupt('return', user);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4['catch'](0);
            throw _context4.t0;

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 13]]);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Remove user by id
 * @param {string} id
 * @returns {Promise.<*>}
 */
exports.removeUser = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (id) {
              _context5.next = 3;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('User ID missing'));

          case 3:
            _context5.next = 5;
            return _user2.default.findByIdAndRemove(id);

          case 5:
            user = _context5.sent;

            if (user) {
              _context5.next = 8;
              break;
            }

            throw new _errors.UnprocessableEntity(_translate2.default.__('User not found'));

          case 8:
            return _context5.abrupt('return', user);

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](0);
            throw _context5.t0;

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 11]]);
  }));

  return function (_x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getDetails = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
    var user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            if (id) {
              _context6.next = 3;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('User ID missing'));

          case 3:
            _context6.next = 5;
            return _user2.default.findById(id);

          case 5:
            user = _context6.sent;

            if (user) {
              _context6.next = 8;
              break;
            }

            throw new _errors.UnprocessableEntity(_translate2.default.__('User not found'));

          case 8:
            return _context6.abrupt('return', user);

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6['catch'](0);
            throw _context6.t0;

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 11]]);
  }));

  return function (_x9) {
    return _ref6.apply(this, arguments);
  };
}();