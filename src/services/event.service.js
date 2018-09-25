/**
 * @file Event emitter service
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */


import { EventEmitter } from 'events'

export const eventEmitter = new EventEmitter()

eventEmitter
  .on('authenticate', (user) => {
    console.log(`user ${user.name} is logged in`)
  })

export default eventEmitter
