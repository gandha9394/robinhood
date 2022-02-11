import logger from "../utils/log.js";
import { PseudoTerminal, Terminal } from "../utils/pty.js";
import { RTCDonorPeer } from "../utils/webrtc.js";

const pty = new Terminal();
const peer = new RTCDonorPeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : "ws://localhost:8080",
});

peer.onmessage = (msg: any) => {
  logger.info(`recieved message:${msg}`);
  pty.write(msg);
};

peer.connectedToPeer().then(() => {
  pty.onoutput = results => peer.send(results)
});
