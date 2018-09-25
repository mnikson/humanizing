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

server.listen(config.port, () => {
  console.log('Listening at port %s', config.port)

  // start app
  apps(server)
})
