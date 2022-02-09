import logger from "../utils/log.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: "ws://0.0.0.0:8080",
});

peer.connectedToPeer().then(() => {
    peer.send("Kaizoku ou ni ...orewa naru!")
    peer.onmessage = (msg:any) =>{
        logger.verbose(`recieved message:${msg}`)
        peer.send("Kaizoku ou ni ...orewa naru!")
    }
});
