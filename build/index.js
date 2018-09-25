'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file Initialize server and database connection
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

var error = require('./middleware/error');

module.exports = function () {
  /**
   * Database
   */
  // connect database
  require('./models/database');

  var db = _mongoose2.default.connection;

  db.once('open', function () {
    /**
     * Routes
     */
    require('./routes')(_server2.default);

    // Error handler
    _server2.default.use(error.errorHandler);
  });
};