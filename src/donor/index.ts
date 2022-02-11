import logger from "../utils/log.js";
import { PseudoTerminal, Terminal } from "../utils/pty.js";
import spinner from "../utils/spinner.js";
import { RTCDonorPeer } from "../utils/webrtc.js";

const pty = new Terminal();
const peer = new RTCDonorPeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : "ws://34.133.251.43:8080",
});

peer.onmessage = (msg: any) => {
  pty.write(msg);
};
const stopSpinner = spinner("Waiting for connections...");

peer.connectedToPeer().then(() => {
  console.clear();
  stopSpinner();
  pty.onoutput = (results) => {
    peer.send(results);
  };
  pty.onclose = logger.debug;
});
