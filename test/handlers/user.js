/**
 * @file User handler tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import { assert, expect } from 'chai'
import should from 'should'
import translate from '../../src/lib/translate';
let userCtrl
let User

describe("User handler tests", () => {

  before((done) => {
    require('../setup').initBefore(done)
    userCtrl = require('../../src/handlers/user.handler')
    User = require('../../src/models/user.model')
  })

  after((done) => {
    require('../setup').initAfter(done)
  })

  describe("authenticate function", () => {
    it('should not authenticate user, user not found', async () => {
      try {
        let username = 'test'
        let result = await userCtrl.authenticate(username, '1234')
      } catch (err) {
        should.exist(err)
        should(err).have.property('message')
        assert.equal(err.message, translate.__('User not found'))
        should(err).have.property('statusCode')
        assert.equal(err.statusCode, 422)
      }
    })

    it('should not authenticate user, wrong password', async () => {
      try {
        let user = await userCtrl.authenticate('mrdog', '1234')
      } catch (err) {
        should.exist(err)
        should(err).have.property('message')
        assert.equal(err.message, translate.__('Authentication failed. Wrong username or password'))
        should(err).have.property('statusCode')
        assert.equal(err.statusCode, 401)
      }
    })

    it('should authenticate user', async () => {
      try {
        let username = 'mrdog'
        let password = '12345'
        let user = await User.findOne({username: username}).exec()
        user.password = password
        await user.save()

        let result = await userCtrl.authenticate(username, password)

        should(result).be.type('object')
        should(result).have.property('status')
        assert.equal(result.status, true)
        should(result).have.property('token')
        should(result.token).be.type('string')
      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

  describe('create function', () => {

    it('should not create user, required data is missing', async () => {
      try {
        let result = await userCtrl.createUser({})
      } catch (err) {
        should.exist(err)
        should(err).be.type('object')
        should(err).have.property('message')
        assert.equal(err.message, translate.__('Insert valid user data'))
        should(err).have.property('statusCode')
        assert.equal(err.statusCode, 400)
      }
    })

    it('should create user', async () => {
      try {
        let result = await userCtrl.createUser({
          username: 'marty',
          name: 'Marty Mistery',
          password: '12345',
          email: 'marty@test.com',
          active: true,
          admin: false,
        })

        should(result).be.type('object')
        should(result).have.property('_id')
        should(result).have.property('name')
        expect(result.name).to.be.equal('Marty Mistery')
        should(result).have.property('username')
        expect(result.username).to.be.equal('marty')
        should(result).have.property('email')
        expect(result.email).to.be.equal('marty@test.com')
        should(result).have.property('active')
        expect(result.active).to.be.equal(true)
        should(result).have.property('admin')
        expect(result.admin).to.be.equal(false)

      } catch (err) {
        should.exist(err)
        throw err
      }
    })

  })

  describe('update function', () => {

    it('should not update user, user not found', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c2'
        let data = {}
        let result = await userCtrl.updateUser(id, data)
      } catch (err) {
        should.exist(err)
        should(err).have.property('name')
        should(err).have.property('message')
        expect(err.message).to.be.equal(translate.__('Update data missing'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.be.equal(422)
      }
    })

    it('should not update user, data missing', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c9'
        let data = {

        }
        let result = await userCtrl.updateUser(id, data)
      } catch (err) {
        should.exist(err)
        should(err).have.property('name')
        should(err).have.property('message')
        expect(err.message).to.be.equal(translate.__('Update data missing'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.be.equal(422)
      }
    })

    it('should not update user, email address is not valid', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c9'
        let data = {
          name: 'Dylan Doe',
          username: 'dylan',
          email: 'invalid email'
        }
        let result = await userCtrl.updateUser(id, data)
      } catch (err) {
        should.exist(err)
        should(err).have.property('name')
        should(err).have.property('message')
        expect(err.message).to.be.equal(translate.__('Email is not valid'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.be.equal(400)
      }
    })

    it('should update user', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c9'
        let data = {
          name: 'Dylan Doe',
          username: 'dylan',
          email: 'new@test.com'
        }
        let result = await userCtrl.updateUser(id, data)

        should(result).have.property('name')
        expect(result.name).to.be.equal('Dylan Doe')
        should(result).have.property('username')
        expect(result.username).to.be.equal('dylan')
        should(result).have.property('email')
        expect(result.email).to.be.equal('new@test.com')

      } catch (err) {
        should.exist(err)
        throw err
      }
    })

  })

  describe('delete function', () => {

    it('should not delete user, user not found', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c2'
        let result = await userCtrl.removeUser(id)
      } catch (err) {
        should.exist(err)
        should(err).have.property('name')
        should(err).have.property('message')
        expect(err.message).to.be.equal(translate.__('User not found'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.be.equal(422)
      }
    })

    it('should not delete user, user id missing', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c2'
        let result = await userCtrl.removeUser(null)
      } catch (err) {
        should.exist(err)
        should(err).have.property('name')
        should(err).have.property('message')
        expect(err.message).to.be.equal(translate.__('User ID missing'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.be.equal(400)
      }
    })

    it('should delete user', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c0'
        let result = await userCtrl.removeUser(id)

        // console.log('result', result)
        should(result).be.type('object')
        should(result).have.property('_id')
        should(result).have.property('name')
        expect(result.name).to.be.equal('Tin Tin')
        should(result).have.property('username')
        expect(result.username).to.be.equal('tintin')

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

  describe('details function', () => {

    it('should not get details', async () => {
      try {
        let id = null
        let result = await userCtrl.getDetails(id)
      } catch (err) {
        should.exist(err)
        should(err).be.type('object')
        should(err).have.property('message')
        expect(err.message).to.equal(translate.__('User ID missing'))
        should(err).have.property('statusCode')
        expect(err.statusCode).to.equal(400)
      }
    })

    it('should get details', async () => {
      try {
        let id = '5ba7ef1355ccc3856c3507c9'
        let result = await userCtrl.getDetails(id)

        should(result).have.property('_id')
        should(result).have.property('name')
        expect(result.name).to.equal('Dylan Doe')
        should(result).have.property('username')
        expect(result.username).to.equal('dylan')
        should(result).have.property('token')
        should(result.token).be.type('string')

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

})