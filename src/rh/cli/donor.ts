import inquirer from "inquirer";
import { red } from "colorette";
import { either } from "ramda";
import { ProcessDescription } from "pm2";
import {magenta} from "colorette";
import {
  DAEMON_CONFIG,
  DEFAULT_MAX_CPU,
  DEFAULT_MAX_DISK,
  DEFAULT_MAX_MEMORY,
  generateName,
  getDonorPreferences,
  setDonorPreferences,
} from "../config.js";
import pm2 from "../../utils/daemon.js";
export const initializeDaemonsAndDetach = async (
  maxCpu: string,
  maxMemory: string,
  maxDisk: string
) => {
  await pm2.connect("Dummy");
  if (await isAnyDaemonRunning()) {
    console.log(
      red(
        "Daemon already running. Please kill existing daemon using `rh kill` command."
      )
    );
    process.exit(1);
  }
  try {
    const answers = await inquirer.prompt([
      !maxCpu && {
        type: "input",
        name: "maxCpu",
        message: "How much CPU do you wish to allocate?",
        default: getDonorPreferences().savedMaxCpu || DEFAULT_MAX_CPU,
        validate(value: any) {
          const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
          return (
            valid || "Please enter a number between 0 and 100 (non-inclusive)"
          );
        },
      },
      !maxMemory && {
        type: "input",
        name: "maxMemory",
        message: "How much memory do you wish to allocate?",
        default: getDonorPreferences().savedMaxMemory || DEFAULT_MAX_MEMORY,
        validate(value: any) {
          const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
          return (
            valid || "Please enter a number between 0 and 100 (non-inclusive)"
          );
        },
      },
      !maxDisk && {
        type: "input",
        name: "maxDisk",
        message: "How much disk do you wish to allocate?",
        default: getDonorPreferences().savedMaxDisk || DEFAULT_MAX_DISK,
      },
    ]);
    setDonorPreferences(
      maxCpu || answers.maxCpu,
      maxMemory || answers.maxMemory,
      maxDisk || answers.maxDisk
    );
  } catch {
    console.log(red("Prompt couldn't be rendered in the current environment"));
    process.exit(1);
  }
  await startBothDaemons();
};

export const restartDaemon = async () => {
  await killDaemon();
  const {
    maxCpu: savedMaxCpu,
    maxMemory: savedMaxMemory,
    maxDisk: savedMaxDisk,
  } = getDonorPreferences();
  await initializeDaemonsAndDetach(savedMaxCpu, savedMaxMemory, savedMaxDisk);
};

export const killDaemon = async () => {
  await pm2.connect("Existing");
  await deleteBothDaemons();
  await pm2.disconnect();
};

const startBothDaemons = () => {
  const newRoomName = generateName();
  console.log(magenta("Creating room:"+newRoomName))
  return Promise.all([
    pm2.start({
      script: "node",
      name: DAEMON_CONFIG.master.name,
      args: [
        DAEMON_CONFIG.master.absolutePathToScript,
        "--max-cpu",
        getDonorPreferences().maxCpu,
        "--max-memory",
        getDonorPreferences().maxMemory,
        "--max-disk",
        getDonorPreferences().maxDisk,
        "--room-name",
        newRoomName,
      ],
      max_restarts: 1,
    }),
    pm2.start({
      script: "node",
      name: DAEMON_CONFIG.metrics.name,
      args: [
        DAEMON_CONFIG.metrics.absolutePathToScript,
        "--max-cpu",
        getDonorPreferences().maxCpu,
        "--max-memory",
        getDonorPreferences().maxMemory,
        "--max-disk",
        getDonorPreferences().maxDisk,
        "--room-name",
        newRoomName,
      ],
      cron: "*/5 * * * * *",
    }),
  ]);
};

////////////Not used/////////////////
const restartBothDaemons = () =>
  Promise.all([
    pm2.restart(DAEMON_CONFIG.master.name),
    pm2.restart(DAEMON_CONFIG.metrics.name),
  ]);

////////////Not used/////////////////
const stopBothDaemons = () =>
  Promise.all([
    pm2.stop(DAEMON_CONFIG.master.name),
    pm2.stop(DAEMON_CONFIG.metrics.name),
  ]);

const deleteBothDaemons = () =>
  Promise.all([
    pm2.delete(DAEMON_CONFIG.master.name),
    pm2.delete(DAEMON_CONFIG.metrics.name),
  ]);

const isAnyDaemonRunning = async () =>
  (await pm2.list())
    .filter(either(isDaemon, isDaemonMetrics))
    .some(pm2.isOnline);

const isDaemon = (pd: ProcessDescription) =>
  pd.name === DAEMON_CONFIG.master.name;
const isDaemonMetrics = (pd: ProcessDescription) =>
  pd.name === DAEMON_CONFIG.metrics.name;

export const DonorActions = {
  init: initializeDaemonsAndDetach,
  stop: killDaemon,
  restart: restartDaemon,
};
