/**
 * @file User Routes - list of all routes for user
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import jwt from 'jsonwebtoken'
import config from '../config'
import translate from '../lib/translate'
// import errors from '../lib/errors'
import { Unauthorized } from '../lib/errors'

/**
 * Generate authentication token
 * @param {string} username User's username to authenticate
 * @returns {string}
 */
export const generateToken = (username) => {
  const token = jwt.sign({ username: username }, config.token.salt, {
    expiresIn: config.token.expire
  })
  return token
}

/**
 * Verify JWT token
 * @param {string} token 
 */
export const verifyToken = (token) => {
  try {
    let decoded = jwt.verify(token, config.token.salt)

    return decoded
  } catch (err) {
    return new Unauthorized(translate.__('Invalid token'))
  }
}
