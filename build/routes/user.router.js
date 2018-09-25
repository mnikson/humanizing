'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.details = exports.remove = exports.update = exports.create = exports.geList = exports.login = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../handlers/user.handler');

var _user2 = _interopRequireDefault(_user);

var _errors = require('../lib/errors');

var _translate = require('../lib/translate');

var _translate2 = _interopRequireDefault(_translate);

var _response = require('../middleware/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file User Routes - list of all routes for user
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author Nikola Miljkovic <mnikson@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @version 1.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// Controllers

// Libraries


/**
 * Login user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var login = exports.login = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var username, password, err, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            username = req.body.username;
            password = req.body.password;

            if (!(!username || !password)) {
              _context.next = 6;
              break;
            }

            err = new _errors.BadRequest('Username or password missing');
            return _context.abrupt('return', next(err));

          case 6:
            _context.next = 8;
            return _user2.default.authenticate(username, password);

          case 8:
            user = _context.sent;


            res.json(user);

            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(_context.t0));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get list of users
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var geList = exports.geList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var page, sort, limit, order, users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            page = req.query.page;
            sort = req.query.sort;
            limit = req.query.limit || _config2.default.paginate.per_page;
            order = req.query.order;
            _context2.next = 7;
            return _user2.default.activeUsers(page, limit, sort, order);

          case 7:
            users = _context2.sent;


            res.json(users);

            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', next(_context2.t0));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function geList(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Create new user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var create = exports.create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var data, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.body.user;

            if (data) {
              _context3.next = 4;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Insert valid user data'));

          case 4:
            _context3.next = 6;
            return _user2.default.createUser(data);

          case 6:
            user = _context3.sent;


            res.json({
              data: user
            });

            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', next(_context3.t0));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function create(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var update = exports.update = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var data, id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            data = req.body.user;
            id = req.body.id;

            if (data) {
              _context4.next = 5;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('Insert valid user data'));

          case 5:
            _context4.next = 7;
            return _user2.default.updateUser(id, data);

          case 7:
            user = _context4.sent;


            res.json({
              data: user
            });

            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', next(_context4.t0));

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Remove user by id
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var remove = exports.remove = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.body.id;

            if (id) {
              _context5.next = 4;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('User ID missing'));

          case 4:
            _context5.next = 6;
            return _user2.default.removeUser(id);

          case 6:
            result = _context5.sent;


            res.json({
              status: result ? true : false,
              user: result
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);
            return _context5.abrupt('return', next(_context5.t0));

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function remove(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get user details
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
var details = exports.details = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;

            if (id) {
              _context6.next = 4;
              break;
            }

            throw new _errors.BadRequest(_translate2.default.__('User id missing'));

          case 4:
            _context6.next = 6;
            return _user2.default.getDetails(id);

          case 6:
            user = _context6.sent;
            return _context6.abrupt('return', (0, _response.fetchingResponseV3)(req, res, user));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6['catch'](0);
            return _context6.abrupt('return', next(_context6.t0));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 10]]);
  }));

  return function details(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();