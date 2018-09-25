/**
 * @file User API tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import chai from 'chai'
import { assert, expect } from 'chai'
import should from 'should'
import server from '../setup/server'
import translate from '../../src/lib/translate';
import chaiHttp from 'chai-http'
import { generateToken } from '../../src/services/auth.service'

chai.use(chaiHttp)

describe('/v1/users', () => {
  before((done) => {
    require('../setup').initBefore(done)
  })

  after((done) => {
    require('../setup').initAfter(done)
  })

  describe('GET method tests', () => {

    it('should not return list of users, token not provided', async () => {
      try {
        let response = await chai.request(server)
          .get('/v1/users')

        let error = response.error
        expect(error.status).to.be.equal(401)
        let errorText = JSON.parse(error.text)
        expect(errorText.message).to.be.equal(translate.__('No token provided'))
        expect(errorText.statusCode).to.be.equal(401)
      } catch (err) {
        throw err
      }
    })

    it('should not return list of users, invalid token', async () => {
      try {
        let result = await chai.request(server)
          .get('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', '1234')

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 401)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Invalid token'))
      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

    it('should return list of users', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .get('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)

        let response = JSON.parse(result.text)
        should(response).be.type('object')
        should(response).have.property('docs')
        expect(response.docs.length).to.be.equal(3)
        expect(response.total).to.be.equal(3)
        should(response).have.property('limit')
        expect(response.limit).to.be.equal(25)
        should(response).have.property('page')
        expect(response.page).to.be.equal(1)

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

    it('should return list of users, with paging', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .get('/v1/users?page=2')
          .set('Accept', 'application/json')
          .set('x-access-token', token)

        let response = JSON.parse(result.text)

        should(response).be.type('object')
        should(response).have.property('docs')
        expect(response.docs.length).to.be.equal(0)
        expect(response.total).to.be.equal(3)
        should(response).have.property('limit')
        expect(response.limit).to.be.equal(25)
        should(response).have.property('page')
        expect(response.page).to.be.equal('2')
        should(response).have.property('pages')
        expect(response.pages).to.be.equal(1)

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

    it('should return list of users, with paging', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .get('/v1/users?sort=name&order=asc')
          .set('Accept', 'application/json')
          .set('x-access-token', token)

        let response = JSON.parse(result.text)

        should(response).be.type('object')
        should(response).have.property('docs')
        expect(response.docs.length).to.be.equal(3)
        expect(response.total).to.be.equal(3)
        should(response).have.property('limit')
        expect(response.limit).to.be.equal(25)
        should(response).have.property('page')
        expect(response.page).to.be.equal(1)
        should(response).have.property('pages')
        expect(response.pages).to.be.equal(1)
        let user1 = response.docs[0]
        expect(user1.name).to.be.equal('Tin Tin')
        let user2 = response.docs[1]
        expect(user2.name).to.be.equal('Dylan Dog')

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

  describe('PUT method tests', () => {

    it('should not create user, token not provided', async () => {
      try {
        let response = await chai.request(server)
          .put('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', '')
          .send({
            user: null
          })

        let error = response.error
        expect(error.status).to.be.equal(401)
        let errorText = JSON.parse(error.text)
        expect(errorText.message).to.be.equal(translate.__('No token provided'))
        expect(errorText.statusCode).to.be.equal(401)
      } catch (err) {
        throw err
      }
    })

    it('should not create user, invalid token', async () => {
      try {
        let result = await chai.request(server)
          .put('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', 'random_token')
          .send({
            user: null
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 401)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Invalid token'))
      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

    it('should not create user, data is empty', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .put('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            user: null
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 400)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Insert valid user data'))

      } catch (err) {
        should.exist(err)
        throw err
      }
    })

    it('should not create user, required data missing', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .put('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            user: {
              username: 'marty',
              name: 'Marty Mistery',
              password: null,
              email: 'marty@test.com',
              active: true,
              admin: false,
            }
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 400)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Insert valid user data'))
      } catch (err) {
        should.exist(err)
        throw err
      }
    })

    it('should create user', async () => {
      try {
        let token = generateToken('mrdog')
        let response = await chai.request(server)
          .put('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            user: {
              username: 'marty',
              name: 'Marty Mistery',
              password: 12345,
              email: 'marty@test.com',
              active: true,
              admin: false,
            }
          })

        expect(response.status).to.be.equal(200)
        should(response.body).be.type('object')
        should(response.body).have.property('data')
        let result = response.body.data
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
        should.not.exist(err)
        throw err
      }
    })

  })

  describe('POST method tests', () => {

    it('should not update user, token not provided', async () => {
      try {
        let response = await chai.request(server)
          .post('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', '')
          .send({
            user: null
          })

        let error = response.error
        expect(error.status).to.be.equal(401)
        let errorText = JSON.parse(error.text)
        expect(errorText.message).to.be.equal(translate.__('No token provided'))
        expect(errorText.statusCode).to.be.equal(401)
      } catch (err) {
        throw err
      }
    })

    it('should not update user, invalid token', async () => {
      try {
        let result = await chai.request(server)
          .post('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', 'random_token')
          .send({
            user: null
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 401)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Invalid token'))
      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

    it('should not update user, data is empty', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .post('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            user: null
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 400)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Insert valid user data'))
      } catch (err) {
        should.exist(err)
        throw err
      }
    })

    it('should update user', async () => {
      try {
        let token = generateToken('mrdog')
        let response = await chai.request(server)
          .post('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            id: '5ba7ef1355ccc3856c3507c9',
            user: {
              username: 'marty',
              name: 'Marty Mistery',
              password: 12345,
              email: 'marty@test.com',
            }
          })

        expect(response.status).to.be.equal(200)
        should(response.body).be.type('object')
        should(response.body).have.property('data')
        let result = response.body.data
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
        expect(result.admin).to.be.equal(true)

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

  describe('DELETE method tests', () => {

    it('should not delete user, token not provided', async () => {
      try {
        let response = await chai.request(server)
          .delete('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', '')
          .send({
            user: null
          })

        let error = response.error
        expect(error.status).to.be.equal(401)
        let errorText = JSON.parse(error.text)
        expect(errorText.message).to.be.equal(translate.__('No token provided'))
        expect(errorText.statusCode).to.be.equal(401)
      } catch (err) {
        throw err
      }
    })

    it('should not delete user, invalid token', async () => {
      try {
        let result = await chai.request(server)
          .delete('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', 'random_token')
          .send({
            user: null
          })

        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        assert.equal(error.statusCode, 401)
        should(error).have.property('message')
        assert.equal(error.message, translate.__('Invalid token'))
      } catch (err) {
        console.log(err)
        should.not.exist(err)
        throw err
      }
    })

    it('should not delete user, id is empty', async () => {
      try {
        let token = generateToken('mrdog')
        let result = await chai.request(server)
          .delete('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)


        should(result).be.type('object')
        should(result).have.property('error')
        let error = JSON.parse(result.error.text)
        should(error).be.type('object')
        expect(error.statusCode).to.be.equal(400)
        should(error).have.property('message')
        expect(error.message).to.be.equal(translate.__('User ID missing'))
      } catch (err) {
        should.exist(err)
        throw err
      }
    })

    it('should delete user', async () => {
      try {
        let token = generateToken('mrdog')
        let response = await chai.request(server)
          .delete('/v1/users')
          .set('Accept', 'application/json')
          .set('x-access-token', token)
          .send({
            id: '5ba7ef1355ccc3856c3507c1'
          })

        expect(response.status).to.be.equal(200)
        should(response.body).be.type('object')
        should(response.body).have.property('status')
        should(response.body).have.property('user')
        let result = response.body
        expect(result.status).to.be.equal(true)
        let user = result.user
        should(user).have.property('_id')
        should(user).have.property('name')
        expect(user.name).to.be.equal('Captain America')
        should(user).have.property('username')
        expect(user.username).to.be.equal('america')
        should(user).have.property('email')
        expect(user.email).to.be.equal('user3@test.com')

      } catch (err) {
        should.not.exist(err)
        throw err
      }
    })

  })

})

describe('/v1/users/:id', () => {
  before((done) => {
    require('../setup').initBefore(done)
  })

  after((done) => {
    require('../setup').initAfter(done)
  })

  it('should not return user details, token not provided', async () => {
    try {
      let id = null
      let response = await chai.request(server)
        .get(`/v1/users/${id}`)

      let error = response.error
      expect(error.status).to.be.equal(401)
      let errorText = JSON.parse(error.text)
      expect(errorText.message).to.be.equal(translate.__('No token provided'))
      expect(errorText.statusCode).to.be.equal(401)
    } catch (err) {
      throw err
    }
  })

  it('should not return user details, invalid token', async () => {
    try {
      let id = '5ba7ef1355ccc3856c3507c9'
      let result = await chai.request(server)
        .get(`/v1/users/${id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', '1234')

      should(result).be.type('object')
      should(result).have.property('error')
      let error = JSON.parse(result.error.text)
      should(error).be.type('object')
      assert.equal(error.statusCode, 401)
      should(error).have.property('message')
      assert.equal(error.message, translate.__('Invalid token'))
    } catch (err) {
      should.not.exist(err)
      throw err
    }
  })

  it('should not return user details, id not provided', async () => {
    try {
      let id = null
      let token = generateToken('mrdog')
      let result = await chai.request(server)
        .get(`/v1/users/${id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', token)

      should(result).be.type('object')
      should(result).have.property('error')
      let error = JSON.parse(result.error.text)
      should(error).be.type('object')
      assert.equal(error.statusCode, 500)

    } catch (err) {
      throw err
    }
  })

  it('should not return user details, user not found', async () => {
    try {
      let id = '5ba7ef1255ccc3856c3507c2'
      let token = generateToken('mrdog')
      let result = await chai.request(server)
        .get(`/v1/users/${id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', token)

      should(result).be.type('object')
      should(result).have.property('error')
      let error = JSON.parse(result.error.text)
      should(error).be.type('object')
      assert.equal(error.statusCode, 422)
      should(error).have.property('message')
      assert.equal(error.message, translate.__('User not found'))

    } catch (err) {
      throw err
    }
  })

  it('should not return user details, user not found', async () => {
    try {
      let id = '5ba7ef1355ccc3856c3507c0'
      let token = generateToken('mrdog')
      let result = await chai.request(server)
        .get(`/v1/users/${id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', token)

      let response = JSON.parse(result.text)

      should(response).be.type('object')
      should(response).have.property('links')
      should(response.links).have.property('self')
      should(response).have.property('data')
      let data = response.data
      should(data).have.property('_id')
      should(data).have.property('name')
      expect(data.name).to.equal('Tin Tin')
      should(data).have.property('username')
      expect(data.username).to.equal('tintin')
      should(data).have.property('email')
      expect(data.email).to.equal('user2@test.com')
      should(data).not.have.property('password')

    } catch (err) {
      throw err
    }
  })

})