import { promisify } from "node:util";
import pkg, { StartOptions, ProcessDescription } from "pm2";
const {
  killDaemon,
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
import logger, {Spinner} from "./log.js";

type Verb = keyof typeof PM2;
type ProcessName = string;
type Monad = readonly [processName: string, verb: Verb, args?: StartOptions];

////////////// lookup maps & helpers ///////////////
const PM2 = {
  kill:promisify(killDaemon),
  connect: promisify(connect),
  disconnect:promisify(disconnect),
  start: promisify<StartOptions>(start),
  restart: promisify<string>(restart),
  stop: promisify<string>(stop),
  delete: promisify<string>(deleteP),
  list: promisify(list),
};
const presentParticiple = (verb: Verb) =>
  verb.endsWith("e") ? verb.slice(0, -1) + "ing" : verb + "ing";

/////////////////////////////////////////////////////

////----------The Pipe-------------------/////////////
const StartSpinner_Execute_StopSpinner = (monad: Monad) => pipe(startSpinner, execute, stopSpinner)(monad)[2]
/////////////////////////////////////////////////////

////----Parts that make up the pipe------/////////////
const startSpinner = function ([processName, verb, __]: Monad): Monad {
  Spinner.start(
    `${presentParticiple(verb)} ${processName} process...`
  );
  return [processName, verb, __];
};
const execute = ([processName, verb, args]: Monad): [string, Verb, void | ProcessDescription[]] => {
  logger.verbose("Pipe running for :"+verb+'::'+processName+'::'+args);
  return [processName, verb, PM2[verb].bind(pkg)(args as any)];
}

const stopSpinner = function ([processName, verb, resultPromise]: unknown) {
  Spinner.stop();
  console.log(green(`${presentParticiple(verb)} ${processName} process...`));
  return [processName, verb, resultPromise];
};
////////////////////////////////////////////////////

export default {
  killAll:PM2.kill.bind(pkg),
  detach :PM2.disconnect.bind(pkg),
  connect: (processName: string) =>
    StartSpinner_Execute_StopSpinner([processName, "connect", undefined]),
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