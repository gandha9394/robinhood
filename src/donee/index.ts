import logger from "../utils/log.js";
import { PseudoTerminal, Terminal } from "../utils/pty.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const pty = new PseudoTerminal();

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : "ws://34.133.251.43:8080",
});

peer.onmessage = (msg: any) => {
  logger.info(`recieved message:${msg}`);
  pty.print(msg);
};
peer.connectedToPeer().then(() => {
  peer.send("Kaizoku ou ni ...orewa naru!");
  pty.oninput = (input) => peer.send(input);
});
