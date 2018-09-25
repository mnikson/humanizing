/**
 * @file Utils library tests
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

import chai from 'chai'
import { assert, expect } from 'chai'
import should from 'should'
import server from '../setup/server'
import translate from '../../src/lib/translate';
import { generateToken } from '../../src/services/auth.service'
import config from '../config'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
import { generatePassword } from '../../src/lib/utils'

describe('Generate password tests', () => {

  it('should generate password with salt', (done) => {
    let password = generatePassword(12345)
    // console.log('password', password)
    expect(password).to.not.be.empty
    should(password).be.type('string')
    done()
  })

})