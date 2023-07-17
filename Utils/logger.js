import winston from 'winston'

const env = process.env.NODE_ENV || 'development'

const options = {}

const customeLogger = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http : 4,
    debug: 5,
  },
  colors: {
    fatal: 'black',
    error: 'green',
    warn: 'red',
    info: 'blue',
    http: 'red',
    debug: 'white',
  },
}

if (env === 'production') {
  options.levels = customeLogger.levels
  options.transports = [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customeLogger.colors }),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      format: winston.format.simple(),
    }),
  ]
} else {
  options.transports = [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      format: winston.format.simple(),
    }),
  ]
}

const logger = winston.createLogger(options)

logger.info(`NODE_ENV=${env}`)

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}