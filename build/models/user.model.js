'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _utils = require('../lib/utils');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file User model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author Nikola Miljkovic <mnikson@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @version 1.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var Schema = _mongoose2.default.Schema;

var SALT_WORK_FACTOR = 10;


var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  token: String,
  created: Date,
  updated: Date
});
userSchema.plugin(_mongoosePaginate2.default);

// Remove password from user model
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Generate password and created date
userSchema.pre('save', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.created) this.created = new Date();
            this.updated = new Date();

            if (this.isModified('password')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', next());

          case 4:
            _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
              if (err) return next(err);
              // hash the password using our new salt
              _bcrypt2.default.hash(_this.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                _this.password = hash;
                next();
              });
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Compare given password with stored in database
 * @param {string} candidatePassword
 * @returns {Promise.<*>}
 */
userSchema.methods.comparePassword = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(candidatePassword) {
    var isMatch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bcrypt2.default.compare(candidatePassword, this.password);

          case 3:
            isMatch = _context2.sent;
            return _context2.abrupt('return', isMatch);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            throw _context2.t0;

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = _mongoose2.default.model('users', userSchema);