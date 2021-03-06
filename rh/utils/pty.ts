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
export interface Command extends STDOUTdata {
  type: "CMD";
}
export interface CommandResult extends STDOUTdata {
  type: "RSLT";
}

// https://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings/29497680
export const clearANSIFormatting = (str: string) => {
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")
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
  // Function to clear input echo
  sanitizeCommandResult(cmdStr: string) {
    /* 
      Docker output always contains user cli line AFTER the input echo
      Example:
        pwd                                           
        /                                                           
        ]0;root@a52a3c0eaa27: /root@a52a3c0eaa27:/#
      This is sometimes sent separately or even *along with the output* 
      So, we can't discard the entire line as it might contain the actual output too
      Hence, removing the FIRST occurrence of the last command from the output
      (along with any carriage returns)
    */

    let _1 = cmdStr
    let _2 = [...this.history].pop()?.data.trim()

    if(_2) {
      // Remove last command from the beginning
      if(_1.indexOf(_2) === 0) {
        _1 = _1.replace(_2, "")
        cmdStr = cmdStr.replace(_2, "")
      }

      // Remove any combination of carriage returns from the beginning
      if(_1.indexOf("\r\n") === 0) {
        _1 = _1.replace("\r\n", "")
      }
      if(_1.indexOf("\r") === 0) {
        _1 = _1.replace("\r", "")
      }
      if(_1.indexOf("\n") === 0) {
        _1 = _1.replace("\n", "")
      }
    }
    return _1;
  }

  set onoutput(onOutput: (commandResult: CommandResult) => void) {
    this._pty?.onData((cmdStr: string) => {
      cmdStr = this.sanitizeCommandResult(cmdStr);
      const commandResult: CommandResult = {
        type: "RSLT",
        data: cmdStr,
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