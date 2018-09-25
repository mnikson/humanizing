/**
 * @file Database setup, connection and import models
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

const config = require('../config')
const mongoose = require('mongoose')

mongoose.connect(config.db.uri, {

  useMongoClient: true,
})

mongoose.Promise = global.Promise

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('Database connected')

  require('./user.model')
})

exports.db = mongoose
