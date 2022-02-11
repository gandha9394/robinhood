import { createLogger, format, transports } from "winston";
const { combine, printf } = format;

const logFormat = printf(({ level, message, stack }) => {
  return `[${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: "info",
    silent: false, //set this to true later
    format: combine(format.errors({ stack: true }), format.colorize({ all: true }), logFormat),
    transports: [new transports.Console()],
});

export const devLogger = createLogger({
    level: "silly",
    silent: false, //set this to true later
    format: combine(format.errors({ stack: true }), format.colorize({ all: true }), logFormat),
    transports: [new transports.Console()],
});
export default logger;

export class Deferred {
    promise: Promise<null>;
    resolve: Function = () => logger.debug("The Watchdog of the underworld");
    constructor() {
        this.promise = new Promise((res) => {
            this.resolve = res;
        });
    }
}
