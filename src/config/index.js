const { NODE_ENV, PORT, LOGGER_LEVEL } = process.env

const IS_TEST = NODE_ENV === 'test'

module.exports = {
  IS_TEST,
  LOGGER_LEVEL,
  PORT
}
