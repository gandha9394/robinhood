const util = require('util');
const { createLogger, format, transports } = require("winston");
const { LOG_LEVEL } = require("../config");
const { combine, printf } = format;

const logFormat = printf(({ level, message, stack }) => {
    return `[${level}]: ${stack || message}`;
});

const winstonLogger = createLogger({
    level: LOG_LEVEL,
    format: combine(
        format.errors({ stack: true }),
        format.colorize({ all: true }),
        logFormat
    ),
    transports: [new transports.Console()],
});

const writeLogType = (logLevel) => {
    return function () {
        const args = Array.from(arguments);
        winstonLogger[logLevel](util.format(...args));
    };
};

const logger = {
    silly: writeLogType('silly'),
    debug: writeLogType('debug'),
    verbose: writeLogType('verbose'),
    info: writeLogType('info'),
    warn: writeLogType('warn'),
    error: writeLogType('error'),
};

module.exports = logger;
