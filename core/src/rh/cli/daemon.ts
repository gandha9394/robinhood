import inquirer, {Question } from "inquirer";
import { red } from "colorette";
import { either } from "ramda";
import pm2 from "rh/cli/process.js";
import {
  DAEMON_METRICS_PROCESS_NAME,
  DAEMON_METRICS_PROCESS_SCRIPT,
  DAEMON_PROCESS_NAME,
  DAEMON_PROCESS_SCRIPT,
  DEFAULT_MAX_CPU,
  DEFAULT_MAX_DISK,
  DEFAULT_MAX_MEMORY,
  getUserPreferences,
  setUserPreferences,
  UserPreferenceAnswers,
} from "../config.js";

export const initializeDaemon = async (
  maxCpu: string,
  maxMemory: string,
  maxDisk: string
) => {
    await pm2.connect("Dummy");
    if(await DaemonProcess.isRunning()){
      console.log(red("Daemon already running. Please kill existing daemon using `rh kill` command."));
      process.exit(1);
    }
    const {
      maxCpu: savedMaxCpu,
      maxMemory: savedMaxMemory,
      maxDisk: savedMaxDisk,
    } = getUserPreferences();

    // Ask for limits if not provided
    let questions: Question[] = [];
    if (!maxCpu) {
      questions.push({
        type: "input",
        name: "maxCpu",
        message: "How much CPU do you wish to allocate?",
        default: savedMaxCpu || DEFAULT_MAX_CPU,
        validate(value: any) {
          const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
          return (
            valid || "Please enter a number between 0 and 100 (non-inclusive)"
          );
        },
      });
    }
    if (!maxMemory) {
      questions.push({
        type: "input",
        name: "maxMemory",
        message: "How much memory do you wish to allocate?",
        default: savedMaxMemory || DEFAULT_MAX_MEMORY,
        validate(value: any) {
          const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
          return (
            valid || "Please enter a number between 0 and 100 (non-inclusive)"
          );
        },
      });
    }
    if (!maxDisk) {
      questions.push({
        type: "input",
        name: "maxDisk",
        message: "How much disk do you wish to allocate?",
        default: savedMaxDisk || DEFAULT_MAX_DISK,
      });
    }
    try{
    const answers = await inquirer.prompt<UserPreferenceAnswers>(questions);
    setUserPreferences(
        maxCpu || answers.maxCpu,
        maxMemory||answers.maxMemory,
        maxDisk||answers.maxDisk
    )
    }catch(err:any){
        if(err.isTtyError){
          console.log(red("Prompt couldn't be rendered in the current environment"));
          process.exit();
        }
        console.error(err)
    }
    await DaemonProcess.start()
    pm2.disconnect();
};

export const restartDaemon = async () => {
    await killDaemon();
    const {
      maxCpu: savedMaxCpu,
      maxMemory: savedMaxMemory,
      maxDisk: savedMaxDisk,
    } = getUserPreferences();
    await initializeDaemon(savedMaxCpu, savedMaxMemory, savedMaxDisk);
};

export const killDaemon = async () => {
    await pm2.connect("Existing");
    await DaemonProcess.delete();
    await pm2.disconnect();
}
export class DaemonProcess {
  static start = () =>
    Promise.all([
      pm2.start({
        script: "node",
        name: DAEMON_PROCESS_NAME,
        args: [DAEMON_PROCESS_SCRIPT, "--test"],
      }),
      pm2.start({
        script: "node",
        name: DAEMON_METRICS_PROCESS_NAME,
        args: [DAEMON_METRICS_PROCESS_SCRIPT, "--test"],
        cron: "*/5 * * * * *",
      }),
    ]);

  static restart = () =>
    Promise.all([
      pm2.restart(DAEMON_PROCESS_NAME),
      pm2.restart(DAEMON_METRICS_PROCESS_NAME),
    ]);

  static stop = () =>
    Promise.all([
      pm2.stop(DAEMON_PROCESS_NAME),
      pm2.stop(DAEMON_METRICS_PROCESS_NAME),
    ]);

  static delete = () =>
    Promise.all([
      pm2.delete(DAEMON_PROCESS_NAME),
      pm2.delete(DAEMON_METRICS_PROCESS_NAME),
    ]);

  static isRunning = async () => (await pm2.list())
      .filter(either(pm2.isDaemon, pm2.isDaemonMetrics))
      .some(pm2.isOnline);
}
