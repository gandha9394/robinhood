import pty, { IPty } from "node-pty";
import readline from "readline";
import logger from "./log.js";

interface TerminalConfig {
  devtest?: boolean;
}
interface STDOUTdata {
  type: "CMD" | "RSLT";
  data: string;
}
interface Command extends STDOUTdata {
  type: "CMD";
}
interface CommandResult extends STDOUTdata {
  type: "RSLT";
}

export class Terminal {
  /**
   * JOB: take input via method call, execute and send output through callback (another method)
   * but NEVER print
   */
  static PAUSE = "\x13";
  static RESUME = "\x11";
  _pty?: IPty;
  history: Array<Command> = [];

  constructor({ devtest }: TerminalConfig = {}) {
    if (devtest) this.devtest();
    else {
      this._pty = pty.spawn("bash", [], {});
    }
  }

  //https://github.com/microsoft/node-pty/issues/429
  isThisAnInputEcho(cmdStr: string) {
    let _1 = cmdStr.trim()
    let _2 = [...this.history].pop()?.data.trim()
    _1 = _1.split('\n')[0].trim()
    return _1 === _2;
  }

  set onoutput(onOutput: (commandResult: CommandResult) => void) {
    this._pty?.onData((cmdStr: string) => {
      if (this.isThisAnInputEcho(cmdStr)) return;
      const commandResult: CommandResult = {
        type: "RSLT",
        data:cmdStr,
      };
      onOutput(commandResult);
    });
  }
  set onclose(onClose: (ev: any) => void) {
    this._pty?.onExit(onClose);
  }

  write(data: Command) {
    this.history.push(data);
    this._pty!.write(data.data);
  }

  pause() {
    this._pty!.write(Terminal.PAUSE);
  }
  resume() {
    this._pty!.write(Terminal.RESUME);
  }
  devtest() {
    return;
  }
}
interface PseudoTerminalConfig {
  customPrinter?: (result: CommandResult) => void;
  devtest?: boolean;
}
export class PseudoTerminal {
  /**
   * JOB: take input and print --> === === --> take output and print
   * but NEVER Execute
   */
  customPrinter: PseudoTerminalConfig["customPrinter"];
  history: Array<Command> = [];
  rl: readline.Interface;

  constructor({ devtest, customPrinter }: PseudoTerminalConfig = {}) {
    if (devtest) this.devtest();
    this.customPrinter = customPrinter;
    this.rl = readline.createInterface({
      input: process.stdin,
      prompt: "",
    });
  }
  set oninput(onInput: (command: Command) => void) {
    this.rl.on("line", (line) => {
      const command: Command = {
        type: "CMD",
        data: line + "\n",
      };
      onInput(command);
      this.history.push(command);
    });
  }
  set onclose(onClose: (data: any) => void) {
    onClose(this.history);
  }

  print(result: CommandResult) {
    if (this.customPrinter) this.customPrinter(result);
    else process.stdout.write(result.data);
  }
  devtest() {
    return;
  }
}
