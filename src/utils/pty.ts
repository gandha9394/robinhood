import pty, { IPty } from "node-pty";
import readline from "readline";
import logger from "./log.js";

interface TerminalConfig {
  devtest?: boolean;
  ptyProcess?: IPty;
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

  constructor({ devtest, ptyProcess }: TerminalConfig = {}) {
    if (devtest) this.devtest();
    else {
      this._pty = ptyProcess;
    }
  }

  //https://github.com/microsoft/node-pty/issues/429
  isThisAnInputEcho(cmdStr: string) {
    /* Docker output always contains user cli line
    // Example:
          pwd                                           
│         /                                                           
│         ]0;root@a52a3c0eaa27: /root@a52a3c0eaa27:/#
      Splitting on "#" for now to get the actual cmdStr
    */
    // if(cmdStr.includes("#")) {
    //   cmdStr = cmdStr.split("#")[1]
    // }
    console.log("cmdStr srray", Array.from(cmdStr))
    cmdStr = cmdStr.split("\r\n")[0]
    let _1 = cmdStr.trim()
    let _2 = [...this.history].pop()?.data.trim()
    console.log("cmdStr trimmed", _1)
    console.log("history item trimmed", _2)
    _1 = _1.split('\n')[0].trim()
    console.log("cmdStr modified", _1)
    console.log("condition", _1 === _2)
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
