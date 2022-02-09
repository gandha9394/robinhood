import chalk from "chalk";
import { compose } from "ramda";

export const Log = {
  info: compose(console.log, chalk.greenBright),
  error: compose(console.log, chalk.redBright),
  warn: compose(console.log, chalk.yellowBright),
};

export const delay = (seconds: number = 3) =>
  new Promise((res) => setTimeout(res, seconds * 1000));
