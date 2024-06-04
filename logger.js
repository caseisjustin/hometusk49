import winston from 'winston';
import MongoDB from 'winston-mongodb';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new MongoDB({
      db: 'mongodb://localhost:27017/myapp',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      collection: 'logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

export default logger;