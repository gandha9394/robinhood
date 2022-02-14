import { promisify } from "node:util";
import pkg, { StartOptions, ProcessDescription } from "pm2";
const {
  connect,
  disconnect,
  start,
  restart,
  stop,
  delete: deleteP,
  list,
} = pkg;
import { green } from "colorette";
import { andThen, pipe } from "ramda";
import {Spinner} from "./log.js";

type Verb = keyof typeof PM2;
type ProcessName = string;
type Monad = readonly [processName: string, verb: Verb, args?: StartOptions];

////////////// lookup maps & helpers ///////////////
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

const Spinners: Record<ProcessName, any> = {};
/////////////////////////////////////////////////////

////----------The Pipe-------------------/////////////
const StartSpinner_Execute_StopSpinner = (monad: Monad) =>
  (
    pipe(startSpinner, execute, andThen(stopSpinner))(monad) as Promise<
      [string, Verb, void]
    >
  ).then((monad: [string, Verb, void]) => monad[2]);
/////////////////////////////////////////////////////

////----Parts that make up the pipe------/////////////
const startSpinner = function ([processName, _, __]: Monad): Monad {
  Spinners[processName] = Spinner.start(
    `${presentParticiple("start")} ${processName} process...`
  );
  Spinners[processName].start();
  return [processName, _, __];
};
const execute = async ([processName, verb, args]: Monad): Promise<
  [string, Verb, void | ProcessDescription[]]
> => [processName, verb, await PM2[verb].bind(pkg)(args as any)];

const stopSpinner = function ([processName, _, __]: unknown) {
  Spinners[processName].stop();
  delete Spinners[processName];
  console.log(green(`${presentParticiple("stop")} ${processName} process...`));
  return [processName, _, __];
};
////////////////////////////////////////////////////

export default {
  connect: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "connect", undefined]),
  disconnect:disconnect.bind(pkg),
  start: (opts: StartOptions) =>
    StartSpinner_Execute_StopSpinner([opts.name!, "start", opts]),
  restart: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "restart", undefined]),
  stop: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "stop", undefined]),
  delete: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "delete", undefined]),
  list: PM2.list.bind(pkg),
 
  isOnline: (pd: ProcessDescription) =>
    pd && pd.pm2_env && pd.pm2_env.status === "online",
};
//handle room name here somehow from daemon.ts