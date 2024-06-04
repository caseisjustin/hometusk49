import winston from 'winston';
import expressWinston from 'express-winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/logs' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
});

const expressLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/logs' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}}',
  expressFormat: true,
  colorize: false,
});

export default {
    logger,
    expressLogger
}