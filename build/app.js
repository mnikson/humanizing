'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// application
/**
 * @file Start application
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

// const config = require('./config')
var apps = require('./index');
// const server = require('./src/server').server
//
// /**
//  * start application
//  */
// server.listen(config.port, () => {
//   console.log('listening at %s', config.port)
//
//   // start app
//   apps(server)
// })
// const server = require('./src/server').server

_server2.default.listen(_config2.default.port, function () {
  console.log('Listening at port %s', _config2.default.port);

  // start app
  apps(_server2.default);
});