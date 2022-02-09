import { pipe } from "ramda";
import { Log } from "./log";

const {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
} = require("wrtc");
const { WebSocket } = require("ws");
const chalk = require("chalk");

/**--------CONFIG & SETUP--------------------- */
const CONFIG = {
  SIGNALING_SERVER: "ws://55e3-35-198-245-229.ngrok.io/",
  ICE_SERVER: "stun:stun.l.google.com:19302",
  DEFAULT_ROOM: "trafalgar",
};
let initiator = process.argv.some((cmdLineArg) => cmdLineArg === "-init");

type Candidate = any;
type SocketId = string;
type RTCPeerConnectionType = any;
type DataChannelType = any;
type PeerEvent = string;
type Config = any;
type SDP = any;

class Peer {
  Q: Array<Candidate> = [];
  connections: Array<SocketId> = [];
  peerConnections: Record<SocketId, RTCPeerConnectionType> = {};
  dataChannels: Record<SocketId, DataChannelType> = {};
  callbacks: Record<PeerEvent, Array<Function>> = {};
  socket: WebSocket | null = null;
  config: Config;
  whoAmI:null = null;

  constructor(config: Config) {
    this.config = config;
    this.socket = new WebSocket(config.signaling_server);
    if (this.socket)
      this.socket.onopen = () => {
        pipe(this.register, this.handleError, this.handleClose, this.handleCommandsFromCentralServer)(this.socket);
      };
  }

  //category: interfacing with centralserver
  fire(commandName:string, ...args:Array<any>){
  (this.callbacks[commandName] || []).map((cb) => cb(...args));
  }

  //category: interfacing with centralserver
  on(commandName:string, callback:Function ){
  this.callbacks[commandName] = this.callbacks[commandName] || [];
  this.callbacks[commandName].push(callback);
  }

  setupCallbacksToCommandsFromCentralServer(){
      this.on("get_peers", (data:any) =>{
        this.whoAmI = data.you;
        //this is pointless. can safely delete
        this.connections = data.connections;
        this.connections
      })
      this.on("new_peer_connected", (data:any)=>{

      })
      this.on("remove_peer_connected", (data:any)=>{
          delete this.peerConnections[data.socketId];
          //TODO: cleanup and destructor
      })
      this.on("receive_offer", (data:any)=>{

      })
  }

  //category:util
  register(socket: WebSocket | null) {
    socket &&
      socket.send(
        JSON.stringify({ eventName: "join_room", data: this.config.roomName })
      );
    return socket;
  }

  //category:util
  handleError(socket: WebSocket | null) {
    if (socket) socket.onerror = Log.error;
    return socket;
  }

  //category:util
  handleClose(socket: WebSocket | null) {
    if (socket)
      socket.onclose = () => {
        //TODO: destructor and cleanup
        Log.info(
          "Socket closed, Peer killed. I will no longer listen to any commands or REST API calls"
        );
      };
    return socket;
  }
  //category:util
  getSocketIdForPeerConnection(peerConnection:RTCPeerConnectionType){
      for(let socketId in this.peerConnections)
      if(peerConnection===this.peerConnections[socketId]) return socketId;
      Log.error("SocketID not found for given peerConnection. Seems like you messed up.")
      process.exit(1);
  }
  //category:util
  getSocketIdForDataChannel(dataChannel :DataChannelType){
      for(let socketId in this.dataChannels)
      if(dataChannel===this.dataChannels[socketId]) return socketId;
      Log.error("SocketID not found for given dataChannel. Seems like you messed up.")
      process.exit(1);
  }
  handleCommandsFromCentralServer(socket:WebSocket|null){
      if(socket)
      socket.onmessage = ({data}:any) =>{
          data  = JSON.parse(data);
          fire(data.eventName, data.data);
      }
  }
  sendMessageToCentralServer(msg:any){
      if(this.socket && this.socket.readyState == this.socket.OPEN){
      this.socket.send(JSON.stringify(msg));
      Log.info(`Sending MSG to central server:${JSON.stringify(msg)}`)
      }
  }
  relayMessageThroughCentralServer(msg:any){
    this.sendMessageToCentralServer(msg) //L.O.L
  }
}

class RTCPeer extends Peer{
    constructor(config:Config){
        super(config);

    }

    onReceiveIceCandidate(socketId:SocketId, candidate:Candidate){
        if(!this.peerConnections[socketId]){
            Log.error("You fucked up the flow. Gon kill myself. Bye...")
            process.exit(1);
        }
        Log.info("Received an ICE candidate from:"+socketId);
        const rtcIceCandidate = new RTCIceCandidate(candidate);
        const pc = this.peerConnections[socketId];
        if(pc.remoteDescription) pc.addIceCandidate(rtcIceCandidate);
        else this.Q.push(rtcIceCandidate);
    }
    sendIceCandidate(socketId:SocketId, candidate:Candidate){
        this.relayMessageThroughCentralServer({
            eventName:'send_ice_candidate',
            data:{
                label:this.config.roomName,
                candidate,
                socketId
            }
        })    
    }
    createRTCPeerConnection(socketId:SocketId){
        if(socketId in this.peerConnections){
            Log.warn("RTCPeerConnection already exists for socketID:"+socketId);
            return;
        }
        const pc = this.peerConnections[socketId] = new RTCPeerConnection({
            iceServers:[{urls:[this.config.iceServer]}]
        })
    }
    createDataChannel(socketId:SocketId){
        if(socketId in this.dataChannels){
            Log.warn("DataChannel already exists for socketID:"+socketId);
            return;
        }
        const pc = this.peerConnections[socketId];
        if(!pc){
            Log.error("RTCPeerConnection not found for socketID:"+socketId);
            process.exit(1);
        }
        const dc = this.dataChannels[socketId] = pc.createDataChannel();
        pipe(
            this.dataChannelOnOpen,
            this.dataChannelOnClose,
            this.dataChannelOnError,
            this.dataChannelOnMessage
        )(dc);

    }
    peerConnectionOnOpen(peerConnection:any){
        peerConnection.onopen = () => Log.info("PeerConnection opened");
        return peerConnection;
    }
    peerConnectionOnClose(peerConnection:any){
        peerConnection.onclose = () => Log.info("PeerConnection closed");
        return peerConnection;
    }
    peerConnectionOnDataChannel(peerConnection:any){
        peerConnection.ondatachannel = ({channel}:any) => {
            //not sure what to do with the received data channel
            Log.info("PeerConnection ondatachannel::Choosing not to do anything with this datachannel");
        }
        return peerConnection;
    }
    peerConnectionOnIceCandidate(peerConnection:any){
        const socketId = this.getSocketIdForPeerConnection(peerConnection);
        peerConnection.onicecandidate= ({candidate}:any) => {
            Log.info("PeerConnection onicecandidate");
            if(candidate) this.sendIceCandidate(socketId,candidate)
            else Log.info("ICE \"Gathering\" done!..")
        }
        return peerConnection;
    }
    dataChannelOnOpen(dataChannel:any){
        dataChannel.onopen = () => Log.info("DataChannel opened");
        return dataChannel;
    }
    dataChannelOnClose(dataChannel:any){
        dataChannel.onclose = () => Log.info("DataChannel closed");
        return dataChannel;
    }
    dataChannelOnMessage(dataChannel:any){
        dataChannel.onmessage = (message:any) => Log.info(`DataChannel recv msg:${message.data}`);
        return dataChannel;
    }
    dataChannelOnError(dataChannel:any){
        dataChannel.onerror = (err:any) => Log.error(`DataChannel error:${err.toString()}`);
        return dataChannel;
    }
}

class RTCDonorPeer extends RTCPeer{
    constructor(config:Config){
        super(config);
    }
    async sendOffer(socketId:SocketId){
        if(!this.peerConnections[socketId]){
            Log.error("Cannot send offer as peerConnection not found for socketID:"+socketId);
            process.exit(1);
        }
        const pc = this.peerConnections[socketId];
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer);
        this.relayMessageThroughCentralServer({
            eventName:'send_offer',
            data:{
                socketId,
                sdp:pc.localDescription
            }
        })
    }
    async receiveAnswer(socketId:SocketId, answer:any){
        if(!this.peerConnections[socketId]){
            Log.error("Cannot recieve answer as peerConnection not found for socketID:"+socketId);
            process.exit(1);
        }
        const pc = this.peerConnections[socketId];
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        while(this.Q.length)
        pc.addIceCandidate(this.Q.shift())
    }
}
class RTCDoneePeer extends RTCPeer{
    constructor(config:Config){
        super(config);
    }
    async receiveOffer(socketId:SocketId, offer:any){
        if(!this.peerConnections[socketId]){
            Log.error("Cannot receive offer as peerConnection not found for socketID:"+socketId);
            process.exit(1);
        }
        const pc = this.peerConnections[socketId];
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        await this.sendAnswer(socketId);

    }
    async sendAnswer(socketId:SocketId){
        if(!this.peerConnections[socketId]){
            Log.error("Cannot send answer as peerConnection not found for socketID:"+socketId);
            process.exit(1);
        }
        const pc = this.peerConnections[socketId];
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        this.relayMessageThroughCentralServer({
            eventName:'send_answer',
            data:{
                socketId,
                sdp:pc.localDescription
            }
        })
    }
}



// async function send(socketId, data) {
//   let dc = _dataChannels[socketId];
//   while (dc.readyState != "open") {
//     console.log("zzz");
//     await delay(1);
//   }
//   dc.send(jsons(data));
// }
