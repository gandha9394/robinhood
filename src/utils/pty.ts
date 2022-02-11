import pty, { IPty } from "node-pty";
import { pipe, trim } from "ramda";
import readline from "readline";
import { devLogger } from "./log.js";

const sleep = (secs: number) => new Promise((r) => setTimeout(r, secs * 1000));

interface TerminalConfig {
  devtest?: boolean;
}

function sanitizeCommand(cmd: string) {
  /** ==>order is important
   * removes a single occurence of double quotes at the start
   * removes a single occurence of a double quote at the end
   * removes any occurences of \r or \n from start and end
   */
  function removeDoubleQuoteFromStart(s: string) {
    return s.startsWith('"') ? s.slice(1) : s;
  }
  function removeDoubleQuoteFromEnd(s: string) {
    return s.endsWith('"') ? s.slice(0, -1) : s;
  }
  return pipe(removeDoubleQuoteFromStart, removeDoubleQuoteFromEnd, trim)(cmd);
}
export class Terminal {
  /**
   * JOB: take input via method call, execute and send output through callback (another method)
   * but NEVER print
   */
  static PAUSE = "\x13";
  static RESUME = "\x11";
  _pty?: IPty;
  history = [">>START"];

  constructor({ devtest }: TerminalConfig = {}) {
    if (devtest) this.devtest();
    else {
      this._pty = pty.spawn("bash", [], {});
    }
  }

  set onoutput(onOutput: (results: string) => void) {
    this._pty?.onData((results: string) => {
      results = sanitizeCommand(results);
      if (results != [...this.history].pop()) {
        onOutput(results);
      }
    });
  }
  set onclose(onClose: (ev: any) => void) {
    this._pty?.onExit(onClose);
  }

  write(data: string) {
    const command = sanitizeCommand(data);
    this.history.push(command);
    this._pty!.write(data + "\r");
  }

  pause() {
    this._pty!.write(Terminal.PAUSE);
  }
  resume() {
    this._pty!.write(Terminal.RESUME);
  }
  devtest() {
    (() => {
      const term = new Terminal();
      term.onoutput = (results) => process.stdout.write(results);
      term.onclose = () => devLogger.silly(term.history);
      const rl = readline.createInterface({ input: process.stdin });
      rl.on("line", (cmd) => term.write(cmd));
    })();
  }
}
interface PseudoTerminalConfig {
  customPrinter?: (results: string) => void;
  devtest?: boolean;
}
export class PseudoTerminal {
  /**
   * JOB: take input and print --> === === --> take output and print
   * but NEVER Execute
   */
  customPrinter: PseudoTerminalConfig["customPrinter"];
  history = [">>START"];

  constructor({ devtest, customPrinter }: PseudoTerminalConfig = {}) {
    if (devtest) this.devtest();
    this.customPrinter = customPrinter;
  }
  set oninput(onInput: (input: string) => void) {
    process.stdin.on("data", (input) => {
      const command = input.toString("utf-8");
      onInput(command);
      this.history.push(command);
    });
  }
  set onclose(onClose: (data: any) => void) {
    onClose(this.history);
  }

  print(results: string) {
    if (this.customPrinter) this.customPrinter(results);
    else process.stdout.write(JSON.parse(results));
  }
  devtest() {
    (async () => {
      const pterm = new PseudoTerminal();
      pterm.oninput = async (input) => {
        devLogger.silly("Assume that im sending this data across: " + input);
        let count = 0;
        while (count++ < 4) {
          await sleep(1);
          pterm.print(".");
        }
      };
      await sleep(7);
      pterm.print("This is your output: <output>");
      devLogger.silly(pterm.history);
    })();
  }
}
