/**
 * @file User Routes - list of all routes for user
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import config from '../config'
// Controllers
import userHndl from '../handlers/user.handler'
// Libraries
import { BadRequest } from '../lib/errors'
import translate from '../lib/translate'
import {fetchingResponseV3} from '../middleware/response'

/**
 * Login user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const login = async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      let err = new BadRequest('Username or password missing')
      return next(err)
    }
    
    const user = await userHndl.authenticate(username, password)

    res.json(user)
    
  } catch (err) {
    return next(err)
  }
}

/**
 * Get list of users
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const geList = async (req, res, next) => {
  try {
    let page = req.query.page
    let sort = req.query.sort
    let limit = req.query.limit || config.paginate.per_page
    let order = req.query.order

    let users = await userHndl.activeUsers(page, limit, sort, order)

    res.json(users)

  } catch (err) {
    return next(err)
  }
}

/**
 * Create new user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const create = async (req, res, next) => {
  try {
    let data = req.body.user

    if (!data) {
      throw new BadRequest(translate.__('Insert valid user data'))
    }

    let user = await userHndl.createUser(data)

    res.json({
      data: user
    })

  } catch (err) {
    return next(err)
  }
}

/**
 * Update user
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const update = async (req, res, next) => {
  try {
    let data = req.body.user
    let id = req.body.id

    if (!data) {
      throw new BadRequest(translate.__('Insert valid user data'))
    }

    let user = await userHndl.updateUser(id, data)

    res.json({
      data: user
    })

  } catch (err) {
    return next(err)
  }
}

/**
 * Remove user by id
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const remove = async (req, res, next) => {
  try {
    let id = req.body.id

    if (!id) {
      throw new BadRequest(translate.__('User ID missing'))
    }

    let result = await userHndl.removeUser(id)

    res.json({
      status: result ? true : false,
      user: result
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Get user details
 * @param {function} req Request
 * @param {function} res Response
 * @param {function} next Middleware
 * @returns {Promise.<*>}
 */
export const details = async (req, res, next) => {
  try {
    let id = req.params.id

    if (!id) {
      throw new BadRequest(translate.__('User id missing'))
    }

    // get user details
    let user = await userHndl.getDetails(id)

    return fetchingResponseV3(req, res, user)

  } catch (err) {
    return next(err)
  }
}
