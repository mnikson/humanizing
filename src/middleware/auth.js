/**
 * @file Middleware for authorization
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

// Libraries
// import errors from '../lib/errors'
import translate from '../lib/translate'
// Services
import { verifyToken } from '../services/auth.service'
import { Unauthorized } from '../lib/errors'

/**
 * Authenticate user by token
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 */
export const authentication = (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    // if token missing
    if (!token) {
      let err = new Unauthorized(translate.__('No token provided'))
      throw err
    }

    // verify token
    let decoded = verifyToken(token)

    if (decoded instanceof Error) {
      return res.status(decoded.statusCode).json(decoded)
    }
    
    req.decoded = decoded
    
    next()
  } catch (err) {
    throw err
  }
}