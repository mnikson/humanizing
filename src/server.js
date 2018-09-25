/**
 * @file Setup the server
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import express from 'express'
import bodyParser from 'body-parser'
import config from './config'

// include local .env file
require('dotenv').config()

/**
 * Log
 */
import log from './services/log'

log.on('finish', () => process.exit())

/**
 * Server
 */
const server = express()

global.server = server

server.use((req, res, next) => {
  res.etag = `${req.method}${req.url}`
  res.header('Etag', res.etag)
  res.header('Last-Modified', Date.parse(new Date()))
  res.setHeader('content-type', 'application/json')

  return next()
})

/**
 * Middleware
 */
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((req, res, next) => {
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString())
  next()
})

/**
 * Default response headers
 */
server.use((req, res, next) => {
  res.setHeader('Server', config.name)
  next()
})

export default server
