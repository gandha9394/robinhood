import logger from "../utils/log.js";
import { RTCDonorPeer } from "../utils/webrtc.js";

const peer = new RTCDonorPeer({
    roomName:'my_room_001',
    signalingServer:'ws://0.0.0.0:8080',
})

peer.connectedToPeer().then(() => {
    peer.send("Kyuuzan hakkai kirenu mono nashi")
    peer.onmessage = (msg:any) =>{
        logger.verbose(`recieved message:${msg}`)
        peer.send("Kyuuzan hakkai kirenu mono nashi")
    }
});
