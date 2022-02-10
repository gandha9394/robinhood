import logger from "../utils/log.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const peer = new RTCDoneePeer({
  roomName: "my_room_001",
  signalingServer: "ws://a03f-35-197-143-115.ngrok.io/",
});

peer.onmessage = (msg:any) =>{
    logger.info(`recieved message:${msg}`)
}
peer.connectedToPeer().then(() => {
    peer.send("Kaizoku ou ni ...orewa naru!")
});
