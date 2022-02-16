import { promisify } from "node:util";
import pkg, { StartOptions, ProcessDescription } from "pm2";
import { pipe } from "ramda";
import { Spinner } from "./log.js";
import { promisifyNullary } from "./async.js";
const {
  killDaemon: k,
  connect: c,
  disconnect: dc,
  start: s,
  restart: r,
  stop: st,
  delete: d,
  list: l,
} = pkg;
const [killDaemon, connect, disconnect, start, restart, stop, deleteP, list] = [
  k,
  c,
  dc,
  s,
  r,
  st,
  d,
  l,
].map((fn) => fn.bind(pkg));
//TODO: get rid of this dirty shite ^
type Verb = keyof typeof PM2;
type Monad = readonly [processName: string, verb: Verb, args?: StartOptions];

////////////// lookup maps & helpers ///////////////
const PM2 = {
  kill: promisifyNullary(killDaemon),
  connect: promisify(connect),
  disconnect: promisify(disconnect),
  start: promisify<StartOptions,unknown>(start),
  restart: promisify<string, unknown>(restart),
  stop: promisify<string, unknown>(stop),
  delete: promisify<string, unknown>(deleteP),
  list: promisify(list),
};
const presentParticiple = (verb: Verb) =>
  verb.endsWith("e") ? verb.slice(0, -1) + "ing" : verb + "ing";

/////////////////////////////////////////////////////

////----------The Pipe-------------------/////////////
const StartSpinner_Execute_StopSpinner = (monad: Monad) =>
  pipe(startSpinner, execute, stopSpinner)(monad)[2];
/////////////////////////////////////////////////////

////----Parts that make up the pipe------/////////////
const startSpinner = function ([processName, verb, __]: Monad): Monad {
  Spinner.start(`${presentParticiple(verb)} ${processName} process...`);
  return [processName, verb, __];
};
const execute = ([processName, verb, args]: Monad): [
  string,
  Verb,
  void | ProcessDescription[]
] => [processName, verb, PM2[verb](args as any)];

const stopSpinner = function ([processName, verb, resultPromise]: unknown) {
  Spinner.stop();
  return [processName, verb, resultPromise];
};
////////////////////////////////////////////////////

export default {
  kill: PM2.kill,
  detach: PM2.disconnect,
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
  list: PM2.list,

  isOnline: (pd: ProcessDescription) =>
    pd && pd.pm2_env && pd.pm2_env.status === "online",
};
//handle room name here somehow from daemon.ts
