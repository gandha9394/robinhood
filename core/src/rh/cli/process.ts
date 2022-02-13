import { promisify } from "util";
import {
  connect,
  disconnect,
  start,
  restart,
  stop,
  delete as deleteP,
  list,
  StartOptions,
  ProcessDescription,
} from "pm2";
import { green } from "colorette";
import CLI from "clui";
import { andThen, pipe } from "ramda";
import { DAEMON_METRICS_PROCESS_NAME, DAEMON_PROCESS_NAME } from "rh/config.js";

type Verb = keyof typeof PM2;
type ProcessName = string;
type Monad = readonly [processName: string, verb: Verb, args?: StartOptions];
/***/ ////////////// lookup maps & helpers /////////////// */
const PM2 = {
  connect: promisify(connect),
  start: promisify<StartOptions>(start),
  restart: promisify<string>(restart),
  stop: promisify<string>(stop),
  delete: promisify<string>(deleteP),
  list: promisify(list),
};
const presentParticiple = (verb: Verb) =>
  verb.endsWith("e") ? verb.slice(0, -1) + "ing" : verb + "ing";

const Spinners: Record<ProcessName, CLI.Spinner> = {};
/***/ //////////////////////////////////////////////////// */
/**/ ////----------The Pipe-------------------/////////////*/
const StartSpinner_Execute_StopSpinner = (monad: Monad) =>
  (
    pipe(startSpinner, execute, andThen(stopSpinner))(monad) as Promise<
      [string, Verb, void]
    >
  ).then((monad: [string, Verb, void]) => monad[2]);
/***/ //////////////////////////////////////////////////// */
/**/ ////----Parts that make up the pipe------/////////////*/
const startSpinner = function ([processName, _, __]: Monad): Monad {
  Spinners[processName] = new CLI.Spinner(
    `${presentParticiple("start")} ${processName} process...`
  );
  Spinners[processName].start();
  return [processName, _, __];
};
const execute = async ([processName, verb, args]: Monad): Promise<
  [string, Verb, void | ProcessDescription[]]
> => [processName, verb, await PM2[verb](args as any)];
const stopSpinner = function ([processName, _, __]: unknown) {
  Spinners[processName].stop();
  delete Spinners[processName];
  console.log(green(`${presentParticiple("stop")} ${processName} process...`));
  return [processName, _, __];
};
/***/ //////////////////////////////////////////////////// */
export default {
  connect: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "connect", undefined]),
  disconnect,
  start: (opts: StartOptions) =>
    StartSpinner_Execute_StopSpinner([opts.name!, "start", opts]),
  restart: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "restart", undefined]),
  stop: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "stop", undefined]),
  delete: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "delete", undefined]),
  list: PM2.list,
  isDaemon: (pd: ProcessDescription) => pd.name === DAEMON_PROCESS_NAME,
  isDaemonMetrics: (pd: ProcessDescription) =>
    pd.name === DAEMON_METRICS_PROCESS_NAME,
  isOnline: (pd: ProcessDescription) =>
    pd && pd.pm2_env && pd.pm2_env.status === "online",
};
