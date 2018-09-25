/**
 * @file Init before tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

const DB = require('../setup/database')

/**
 * Init before tests function
 */
exports.initBefore = (done) => {
  require('../setup/server').server
  // import fixtures
  DB.fixtures(done)
}

/**
 * Init after tests function
 */
exports.initAfter = (done) => {
  DB.drop(() => {
    // DB.disconnect()
    done()
  })
}
