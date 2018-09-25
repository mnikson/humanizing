/**
 * @file Routes - list of all routes
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

/*  Middleware  */
const authMiddleware = require('../middleware/auth')
const responseMiddleware = require('../middleware/response')
/*  Routes  */
import * as userRtr from './user.router'
import errors from '../lib/errors'

module.exports = (server) => {

  // Login user with credentials
  /*
  METHOD: POST
  PATH: /login
  REQUIRED PARAMETERS IN PATH: none
  REQUIRED PARAMETERS: username, password
  RESPONSE: user
  */
  router.post('/login', userRtr.login)

  // Get all users
  /*
  METHOD: POST
  PATH: /users
  REQUIRED PARAMETERS: none
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: sort, order, page
  RESPONSE: user[]
  */
  router.get('/users', authMiddleware.authentication, userRtr.geList)

  // Create new user
  /*
  METHOD: PUT
  PATH: /users
  REQUIRED PARAMETERS: { user: { name, username, password, email, email } }
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.post('/users', userRtr.create)

  // Update user
  /*
  METHOD: POST
  PATH: /users
  REQUIRED PARAMETERS: { user: { name, username, password, email, email } }
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.put('/users', authMiddleware.authentication, userRtr.update)

  // Delete user
  /*
  METHOD: DELETE
  PATH: /users
  REQUIRED PARAMETERS: id
  REQUIRED PARAMETERS IN PATH: none
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user
  */
  router.delete('/users', authMiddleware.authentication, userRtr.remove)

  // Get user data
  /*
  METHOD: GET
  PATH: /users/:id
  REQUIRED PARAMETERS: none
  REQUIRED PARAMETERS IN PATH: id
  OPTIONAL PARAMETERS IN PATH: none
  RESPONSE: user[]
  */
  router.get('/users/:id', authMiddleware.authentication, responseMiddleware.sendV3, userRtr.details)

  server.use('/v1', router)
}
