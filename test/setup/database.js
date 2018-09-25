const config = require('../../src/config')
const mongoose = require('mongoose')
const assert = require('assert')
const _ = require('underscore')
const async = require('async')

var db

mongoose.Promise = global.Promise

/**
 * Connect to database
 *
 * @returns {Object} Database connection
 */
exports.connect = function (cb) {
  mongoose.connect(config.db.test_uri, {
    useMongoClient: true,
  })
  db = mongoose.connection
  db.once('open', () => {
    // import models
    require('../../src/models/user.model')

    cb(db)
  })
}

exports.db = mongoose

/**
 * Load fixtures
 */
exports.fixtures = async (done) => {
  if (!db) {
    return done(new Error('Missing database connection.'))
  }

  // import authors
  const data = require('../fixtures')
  let names = Object.keys(data.collections)
  let promiseArray = []
  names.forEach((name) => {
    data.collections[name].forEach( async (collection) => {
      let Model = db.model(name)
      let newModel = new Model(collection)
      promiseArray.push(newModel.save())
    })
  })

  await Promise.all(promiseArray)

  done()
}

/**
 * Drop collections
 *
 * @param {Function} done Callback function
 */
exports.drop = (done) => {
  if (!db || !db.collections) return done()
  // This is faster then dropping the database
  async.each(db.collections, function (collection, cb) {
    // drop collection from database
    mongoose.connection.db.dropCollection(collection.name, function (err, result) {
      cb(err, result)
    })
  }, done)
}

/**
 * Disconnect database connection
 */
exports.disconnect = (done) => {
  mongoose.disconnect()
  // done()
  mongoose.connection.on('disconnected', () => {
    done()
  });
}
