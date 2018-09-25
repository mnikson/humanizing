/**
 * @file Logger service
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, colorize, printf, prettyPrint, simple, json } = format;

/**
 * Logging
 */
const log = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        // colorize(),
        label({ label: 'humanizingConsole' }),
        timestamp(),
        prettyPrint()

        // format.colorize(),
        // format.timestamp(),
        // format.align(),
        // format.printf((info) => {
        //   // const {
        //   //   timestamp,
        //   //   level,
        //   //   message,
        //   //   ...args
        //   // } = info;

        //   const ts = timestamp.slice(0, 19).replace('T', ' ');
        //   return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        // }),
      ),
      level: 'error',
      handleExceptions: true
    }),
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      format: combine(
        label({ label: 'humanizingLog' }),
        timestamp(),
        json()
      )
     }),
    new transports.File({ filename: 'log/combined.log' })
  ]
})

// exports.log = winston.createLogger({
//   format: combine(
//     label({ label: 'right meow!' }),
//     timestamp(),
//     prettyPrint(),
//     format.json()
//   ),
//   transports: [
//     new winston.transports.Console({
//       level: 'info',
//       // timestamp: () => {
//       //   return new Date().toString()
//       // },
//       // json: true
//     }),
//     new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'log/combined.log' })
//   ]
// })

export default log