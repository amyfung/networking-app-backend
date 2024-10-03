// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'networking-app' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    // You can add more transports like files or remote logging services
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
