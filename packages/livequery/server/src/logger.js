const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

function _createLogger(name = 'LiveQuery') {
  const logger = createLogger({
    format: combine(
      label({ label: name }),
      timestamp(),
      loggerFormat,
    ),
    transports: [new transports.Console()],
  })
  return logger
}

module.exports = {
  default: _createLogger(),
  createLogger: _createLogger,
}
