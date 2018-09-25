/**
 * @file Initialize tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import database from './setup/database'
import mongoose from 'mongoose'

// const database = require('./setup/database')
// const server = require('../src/server').server
import server from '../src/server'
const config = require('../src/config')

describe('Start testing...', function () {
  this.timeout(20000)

  let app

  before((done) => {
    database.connect(() => {
      console.log('Database connected!')
      // delete database
      database.drop(() => {
        app = server.listen(config.port)
        console.log('%s listening at %s', config.base_url, config.port)
        done()
      })
    })
  })

  after((done) => {
    app.close()
    done()

    mongoose.models = {}
    mongoose.modelSchemas = {}
    return mongoose.connection.close()
  })
  /*  Libraries */
  require('./lib')
  /*  Function tests  */
  require('./handlers')
  /*  API tests   */
  require('./api')
  /*  Services tests  */
  require('./services')
})
