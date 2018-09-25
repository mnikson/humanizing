/**
 * @file Common functions
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import crypto from 'crypto'
import validator from 'validator'
import config from '../config'

/**
 * generate password
 *
 * @param {String}  password
 * @return {String} generated password
 */
export const generatePassword = function (password) {
  try {
    if (!password) { throw new Error('Password is empty') }
    password = password + config.password.salt
    let sha1sum = crypto.createHash('sha1')
    sha1sum.update(password)
    return sha1sum.digest('hex')
  } catch (err) {
    return err
  }
}

/**
 * Validate email address
 * @param {string} email Email address for validation
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  return validator.isEmail(email)
}

/**
 * Validate password input
 *
 * @param {String} password Password for validation
 * @returns {null | String}
 */
export const validatePassword = (password) => {
  var error = null

  if (password === '') {
    error = 'You didn\'t enter a password'
  } else if (_.size(password) > 15) {
    error = 'Password is longer then 15 characters'
  } else if (_.size(password) < 6) {
    error = 'Password must be 6 charachters at least'
  }

  return error
}
