const winston = require('winston')
const { LOGGER_LEVEL, IS_TEST } = require('./index')

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: LOGGER_LEVEL || 'info',
      silent: IS_TEST
    })
  ]
})

module.exports = winstonLogger
