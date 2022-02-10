import logger from "../utils/log.js";
import { RTCDonorPeer } from "../utils/webrtc.js";

const peer = new RTCDonorPeer({
    roomName:'my_room_001',
    signalingServer:'ws://0.0.0.0:8080',
})

peer.onmessage = (msg:any) =>{
    logger.info(`recieved message:${msg}`)
    peer.send("Kyuuzan hakkai kirenu mono nashi 2")
}

peer.connectedToPeer().then(() => {
    peer.send("Kyuuzan hakkai kirenu mono nashi");
});
