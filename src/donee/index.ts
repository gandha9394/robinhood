import logger from "../utils/log.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: "ws://0.0.0.0:8080",
});

peer.onmessage = (msg:any) =>{
    logger.info(`recieved message:${msg}`)
    peer.send("Kaizoku ou ni ...orewa naru! 2")
}
peer.connectedToPeer().then(() => {
    peer.send("Kaizoku ou ni ...orewa naru!")
});
