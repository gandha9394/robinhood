import logger from "../utils/log.js";
import { PseudoTerminal, Terminal } from "../utils/pty.js";
import spinner from "../utils/spinner.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const pty = new PseudoTerminal();

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : // : "ws://34.133.251.43:8080",
      "ws://localhost:8080",
});
// const stopSpinner = spinner("Trying to connect...");

peer.onmessage = (commandResult: string) => {
  const commandResultJSON = JSON.parse(commandResult);
  pty.print(commandResultJSON);
};
peer.connectedToPeer().then(() => {
  // stopSpinner();
  pty.oninput = (command) => peer.send(JSON.stringify(command));
  pty.onclose = logger.debug;
});
