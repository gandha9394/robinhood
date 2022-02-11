import logger from "../utils/log.js";
import { PseudoTerminal, Terminal } from "../utils/pty.js";
import spinner from "../utils/spinner.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const pty = new PseudoTerminal();

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : "ws://34.133.251.43:8080",
});
const stopSpinner = spinner("Trying to connect...");

peer.onmessage = (msg: any) => {
  pty.print(msg);
};
peer.connectedToPeer().then(() => {
  console.clear();
  stopSpinner();
  pty.oninput = (input) => peer.send(input);
  pty.onclose = logger.debug;
});
