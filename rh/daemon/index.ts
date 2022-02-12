import pty from "node-pty";
import minimist from "minimist";
import { devLogger } from "../utils/log.js";
import { Terminal } from "../utils/pty.js";
import { RTCDonorPeer } from "../utils/webrtc.js";
import { SIGNALING_SERVER } from "../config.js";

const argv = minimist(process.argv.slice(2));

devLogger.info("Running daemon script");
devLogger.debug("Arguments: " + JSON.stringify(argv));

const generateName = () => "my_room_002";

const peer = new RTCDonorPeer({
    roomName: generateName(),
    signalingServer: SIGNALING_SERVER,
});


peer.connectedToPeer().then(() => {
    process.stdout.write("Connected to peer!")
    
    let dockerPtyTerminal: Terminal | null = null;

    peer.onmessage = (message: string) => {
        console.log(message)
        const messageObj = JSON.parse(message);
        
        if (messageObj.eventName == "create_container") {
            const memoryLimit = "1g"
            const cpus = "1.0"
            const cpuShares = "1024"
            const image = messageObj.data.image
            const dockerRunCommand = `docker run -it --rm --privileged=true --memory=${memoryLimit} --cpus=${cpus} --cpu-shares=${cpuShares} ${image} bash`
            
            const ptyProcess = pty.spawn("docker", dockerRunCommand.split(" ").slice(1), {});
            
            dockerPtyTerminal = new Terminal({ ptyProcess: ptyProcess });

            // Listeners
            dockerPtyTerminal.onoutput = (commandResult) => {
                console.log("commandResult", commandResult)
                peer.send(JSON.stringify(commandResult));
            };
            dockerPtyTerminal.onclose = (ev) => {
                devLogger.debug(ev)
                peer.close()
            };
        }

        if (messageObj.eventName == "command") {
            const commandJSON = messageObj.data; 
            if(dockerPtyTerminal) {
                dockerPtyTerminal.write(commandJSON);
            }
        }
    };

});
