import pty from "node-pty";
import minimist from "minimist";
import { devLogger } from "../utils/log.js";
import { Terminal } from "../utils/pty.js";
import { RTCDonorPeer } from "../utils/webrtc.js";
import { CONTAINER_PREFIX, SIGNALING_SERVER } from "../config.js";
import { generateName } from "./name-generator.js";

const argv = minimist(process.argv.slice(2));
devLogger.debug("Arguments: " + JSON.stringify(argv));

const MAX_CPU = argv["max-cpu"]
const MAX_MEMORY = argv["max-memory"]
const MAX_DISK = argv["max-disk"]
const ROOM_NAME = generateName()

devLogger.warn(`Starting daemon with room name: ${ROOM_NAME}`);

const peer = new RTCDonorPeer({
    roomName: ROOM_NAME,
    signalingServer: SIGNALING_SERVER,
});

let containerRunning = false;

peer.on("connection_established", () => {
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
            const name = `${CONTAINER_PREFIX}_${ROOM_NAME}`
            const shell = "bash"
            const dockerExecCommand = `docker exec -it ${name} ${shell}`
            const dockerRunCommand = `docker run -it --privileged=true --name=${name} --memory=${memoryLimit} --cpus=${cpus} --cpu-shares=${cpuShares} ${image} ${shell}`
            
            let ptyProcess = null;
            if(containerRunning) {
                ptyProcess = pty.spawn("docker", dockerExecCommand.split(" ").slice(1), {});
            } else {
                ptyProcess = pty.spawn("docker", dockerRunCommand.split(" ").slice(1), {});
            }
            
            dockerPtyTerminal = new Terminal({ ptyProcess: ptyProcess });
            containerRunning = true;
            
            // Listeners
            dockerPtyTerminal.onoutput = (commandResult) => {
                peer.send(JSON.stringify(commandResult));
            };
            dockerPtyTerminal.onclose = (ev) => {
                devLogger.debug(ev)
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
