import { PseudoTerminal } from "./pty.js";

const term = new PseudoTerminal();
term.onType = (command) => console.error(JSON.stringify(command));
// setInterval(()=>term.print({type:'RSLT',data:'some random shit every 5 secs'}), 5000);