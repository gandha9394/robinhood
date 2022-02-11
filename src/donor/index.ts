import logger from "../utils/log.js";
import { Terminal } from "../utils/pty.js";
import spinner from "../utils/spinner.js";
import { RTCDonorPeer } from "../utils/webrtc.js";

const pty = new Terminal();
const peer = new RTCDonorPeer({
  roomName: "my_room_001",
  signalingServer: process.env["RHSS"]
    ? process.env["RHSS"]
    : // : "ws://34.133.251.43:8080",
      "ws://localhost:8080",
});

peer.onmessage = (command: string) => {
    const commandJSON = JSON.parse(command);
    pty.write(commandJSON);
};
// const stopSpinner = spinner("Waiting for connections...");

peer.connectedToPeer().then(() => {
  // stopSpinner();
  pty.onoutput = (commandResult) => {
    peer.send(JSON.stringify(commandResult));
  };
  pty.onclose = logger.debug;
});
