const winston = require('winston');
const {format} = require('winston');
const {combine, timestamp, label, printf, json} = format;
const {root_path} = require('../config')
const path = require('path');
const DailyRotateFile = require("winston-daily-rotate-file");

const logsDirectory = path.join(root_path, './logs');


const infoTransport = new DailyRotateFile({
    filename: path.join(logsDirectory, './info/%DATE%-info.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
});

const errorTransport = new DailyRotateFile({
    filename: path.join(logsDirectory, './error/%DATE%-error.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
});

const httpTransport = new DailyRotateFile({
    filename: path.join(logsDirectory, './http/%DATE%-http.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'http',
    format: combine(
        timestamp(),
        json()
    ),
});


const logger = winston.createLogger({
    transports: [
        infoTransport,
        errorTransport,
        httpTransport
    ]
});


//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = {logger};