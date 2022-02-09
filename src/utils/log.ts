import winston from "winston";

const logger = winston.createLogger({
  level: "silly",
  levels:winston.config.syslog.levels,
  silent: false, //set this to true later
  transports: [new winston.transports.Console()],
});

export default logger;

export class Deferred {
  promise: Promise<null>;
  resolve: Function = () => logger.debug("The Watchdog of the underworld");
  constructor() {
    this.promise = new Promise((res) => {this.resolve = res});
  }
}
