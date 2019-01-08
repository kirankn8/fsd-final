const winston = require("winston");
const path = require('path');
const { combine, timestamp, label, printf } = winston.format;

const level = process.env.LOG_LEVEL || 'debug';
const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level,
            format: combine(
                label({ label: 'TaskManager Backend' }),
                timestamp(),
                myFormat
            ),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, 'access.log'),
            level: level,
            format: combine(
                label({ label: 'TaskManager Backend' }),
                timestamp(),
                myFormat
            ),
        }),
    ]
});

module.exports = logger