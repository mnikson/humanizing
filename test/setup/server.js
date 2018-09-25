// const server = require('../../src/server').server
import server from '../../src/server'
const errorHandler = require('../../src/middleware/error').errorHandler
/**
 * Routes
 */
require('../../src/routes')(server)

// Error handler
server.use(errorHandler)

// exports.server = server
export default server
