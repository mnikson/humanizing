/**
 * @file Start application
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

// const config = require('./config')
import config from './config'
import server from './server'
// application
const apps = require('./index')
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

server.listen(config.port, () => {
  console.log('Listening at port %s', config.port)

  // start app
  apps(server)
})
