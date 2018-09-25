/**
 * @file Login API tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import chai from 'chai'
import { assert, expect } from 'chai'
import should from 'should'
import server from '../setup/server'
import translate from '../../src/lib/translate';
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('/v1/login', () => {
  before((done) => {
    require('../setup').initBefore(done)
  })

  after((done) => {
    require('../setup').initAfter(done)
  })

  it('should not login user, missing username', async () => {
    try {
      let response = await chai.request(server)
        .post('/v1/login')
        .send({username: '', password: '12345'})

      should.exist(response.error)
      let error = response.error
      expect(error.status).to.be.equal(400)
      let errorText = JSON.parse(error.text)
      expect(errorText.message).to.be.equal(translate.__('Username or password missing'))
      expect(errorText.statusCode).to.be.equal(400)

    } catch (err) {
      console.log('catch', err)
      throw err
    }

  })

  it('should not login user, user not found', async () => {
    try {
      let response = await chai.request(server)
        .post('/v1/login')
        .send({username: 'test', password: '12345'})

      should.exist(response.error)
      let error = response.error
      expect(error.status).to.be.equal(422)
      let errorText = JSON.parse(error.text)
      expect(errorText.message).to.be.equal(translate.__('User not found'))
      expect(errorText.statusCode).to.be.equal(422)

    } catch (err) {
      throw err
    }

  })

})