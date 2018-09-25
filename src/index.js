/**
 * @file Initialize server and database connection
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import mongoose from 'mongoose'
import server from './server'
const error = require('./middleware/error')

module.exports = () => {
  /**
   * Database
   */
  // connect database
  require('./models/database')

  var db = mongoose.connection

  db.once('open', function () {
    /**
     * Routes
     */
    require('./routes')(server)

    // Error handler
    server.use(error.errorHandler)
  })
}
