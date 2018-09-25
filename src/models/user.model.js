/**
 * @file User model
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema
import mongoosePaginate from 'mongoose-paginate'
import { generatePassword } from '../lib/utils'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10
import config from '../config'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  token: String,
  created: Date,
  updated: Date,
})
userSchema.plugin(mongoosePaginate)

// Remove password from user model
userSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  return obj
}

// Generate password and created date
userSchema.pre('save', async function(next) {
  if (!this.created) this.created = new Date()
  this.updated = new Date()
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      this.password = hash
      next()
    })
  })
})

/**
 * Compare given password with stored in database
 * @param {string} candidatePassword
 * @returns {Promise.<*>}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password)
    // console.log('isMatch', isMatch)
    return isMatch
  } catch (err) {
    throw err
  }
}

module.exports = mongoose.model('users', userSchema)