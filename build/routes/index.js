'use strict';

var _user = require('./user.router');

var userRtr = _interopRequireWildcard(_user);

var _errors = require('../lib/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @file Routes - list of all routes
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

var express = require('express');
var router = express.Router();

/*  Middleware  */
var authMiddleware = require('../middleware/auth');
var responseMiddleware = require('../middleware/response');
/*  Routes  */


module.exports = function (server) {

  // Login user with credentials
  /*
  METHOD: POST
  PATH: /login
  REQUIRED PARAMETERS IN PATH: none
  REQUIRED PARAMETERS: username, password
  RESPONSE: user
  */
  router.post('/login', userRtr.login);

  // Get all users
  /*
  METHOD: POST
  PATH: /users
  REQUIRED PARAMETERS: none
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: sort, order, page
  RESPONSE: user[]
  */
  router.get('/users', authMiddleware.authentication, userRtr.geList);

  // Create new user
  /*
  METHOD: PUT
  PATH: /users
  REQUIRED PARAMETERS: { user: { name, username, password, email, email } }
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.put('/users', userRtr.create);

  // Update user
  /*
  METHOD: POST
  PATH: /users
  REQUIRED PARAMETERS: { user: { name, username, password, email, email } }
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.post('/users', authMiddleware.authentication, userRtr.update);

  // Delete user
  /*
  METHOD: DELETE
  PATH: /users
  REQUIRED PARAMETERS: id
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.delete('/users', authMiddleware.authentication, userRtr.remove);

  // Get user data
  /*
  METHOD: GET
  PATH: /users/:id
  REQUIRED PARAMETERS: none
  REQUIRED PARAMETERS IN PATH: id
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user[]
  */
  router.get('/users/:id', authMiddleware.authentication, responseMiddleware.sendV3, userRtr.details);

  server.use('/v1', router);
};