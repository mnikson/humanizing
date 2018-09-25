/**
 * @file Error handler middleware
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import log from '../services/log'

/**
 * Error handler middleware
 * @param {function} err Error exception
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware function
 */
exports.errorHandler = (err, req, res, next) => {
  // log.error(err)
  if (res.headersSent) {
    return next(err)
  }
  // If err has no specified error code, set error code to 'Internal Server Error (500)'
  if (!err.statusCode) err.statusCode = 500
  // All HTTP requests must have a response, so let's send back an error with its status code and message
  // console.log('errorHandler', err)
  res.status(err.statusCode).send(err)
}