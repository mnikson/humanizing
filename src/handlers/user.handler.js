/**
 * @file Controller for user
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import config from '../config'
// Models
import User from '../models/user.model'
// Library
import { BadRequest, Unauthorized, UnprocessableEntity } from '../lib/errors'
import translate from '../lib/translate'
import { generatePassword, isValidEmail } from '../lib/utils'
// Services
import {generateToken } from '../services/auth.service'
import eventEmitter from '../services/event.service'

/**
 * Authenticate user
 * @param {string} username User's username
 * @param {string} password User's password
 */
exports.authenticate = async (username, password) => {
  try {

    const user = await User.findOne({ username: username }).exec()

    // user not found
    if (!user) {
      throw new UnprocessableEntity(translate.__('User not found'))
    }
    let isMatch = await user.comparePassword(password)
    // check if password matches
    if (!isMatch) {
      throw new Unauthorized(translate.__('Authentication failed. Wrong username or password'))
    }

    // emit event for log, sending email or other
    eventEmitter.emit('authenticate', user)

    const token = generateToken(username)

    return {
      status: true,
      token: token
    }
  } catch (err) {
    throw err
  }
}

/**
 * Get active users
 * @param {number} page
 * @param {number} limit
 * @param {string} sort
 * @returns {Promise.<*>}
 */
exports.activeUsers = async (page = 1, limit = config.paginate.per_page, sort, order) => {
  try {
    let options = {
      limit: limit,
      page: page
    }
    // sort users
    if (sort) {
      let orderValue = (order == 'asc') ? -1 : 1
      options.sort = {}
      options.sort[sort] = orderValue
    }


    let users = await User.paginate({ active: true }, options)

    return users
  } catch (err) {
    throw err
  }
}

/**
 * Create new user
 * @param {object} data
 * @returns {Promise.<*>}
 */
exports.createUser = async (data) => {
  try {
    if (!data.username || !data.name || !data.email || !data.name || !data.password) {
      throw new BadRequest(translate.__('Insert valid user data'))
    }

    if (!data || Object.keys(data).length === 0) {
      throw new BadRequest(translate.__('Insert valid user data'))
    }

    if (data.email && !isValidEmail(data.email)) {
      throw new BadRequest(translate.__('Email is not valid'))
    }

    let newUser = await User.create(data)

    return newUser

  } catch (err) {
    throw err
  }
}

/**
 * Update user
 * @param {string} id
 * @param {object} data
 * @returns {Promise.<*>}
 */
exports.updateUser = async (id, data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new UnprocessableEntity(translate.__('Update data missing'))
    }

    if (data.email && !isValidEmail(data.email)) {
      throw new BadRequest(translate.__('Email is not valid'))
    }

    // update user
    let user = await User.findByIdAndUpdate(id, data, {new: true})

    if (!user) {
      throw new UnprocessableEntity(translate.__('User not found'))
    }

    return user

  } catch (err) {
    throw err
  }
}

/**
 * Remove user by id
 * @param {string} id
 * @returns {Promise.<*>}
 */
exports.removeUser = async (id) => {
  try {
    if (!id) {
      throw new BadRequest(translate.__('User ID missing'))
    }

    let user = await User.findByIdAndRemove(id)

    if (!user) {
      throw new UnprocessableEntity(translate.__('User not found'))
    }

    return user
  } catch (err) {
    throw err
  }
}

exports.getDetails = async (id) => {
  try {
    if (!id) {
      throw new BadRequest(translate.__('User ID missing'))
    }

    let user = await User.findById(id)

    if (!user) {
      throw new UnprocessableEntity(translate.__('User not found'))
    }

    return user
  } catch (err) {
    throw err
  }
}
