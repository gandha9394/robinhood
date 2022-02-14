import ora from "ora";
import { createLogger, format, transports } from "winston";
const { combine, printf } = format;

const logFormat = printf(({ level, message, stack }) => {
  return `[${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: "silly",
    silent: false, //set this to true later
    format: combine(format.errors({ stack: true }), format.colorize({ all: true }), logFormat),
    // format: combine(format.errors({ stack: true }), logFormat),
    transports: [new transports.Console()],
    // transports: [new transports.File({filename:'combined.log'})],
});

export const devLogger = createLogger({
    level: "silly",
    silent: false, //set this to true later
    format: combine(format.errors({ stack: true }), format.colorize({ all: true }), logFormat),
    transports: [new transports.Console()],
});
export const Spinner = ora();

export default logger;