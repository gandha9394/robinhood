import minimist from "minimist";
import { devLogger } from "../../utils/log.js";
import { Terminal } from "../../utils/pty.js";
import { RTCDonorPeer } from "../../utils/webrtc.js";
import pty from "node-pty";
import { startDockerContainer } from "./container.js";

const argv = minimist(process.argv.slice(2));

devLogger.info("Running daemon script");
devLogger.debug("Arguments: " + JSON.stringify(argv));

const generateName = () => "my_room_001";

const peer = new RTCDonorPeer({
    roomName: generateName(),
    //   signalingServer: process.env["RHSS"] || "ws://localhost:8080",
    signalingServer: process.env["RHSS"] || "ws://34.133.251.43:8080",
});

peer.connectedToPeer().then(() => {
    process.stdout.write("Connected to peer!")
    
    let dockerPtyTerminal: Terminal | null = null;

    peer.onmessage = (message: string) => {
        console.log(message)
        const messageObj = JSON.parse(message);
        
        if (messageObj.eventName == "create_container") {
            let ptyProcess = pty.spawn("bash", [], {});
            ptyProcess = startDockerContainer(ptyProcess, "ubuntu", "1G", "1.0", "1024");
            
            dockerPtyTerminal = new Terminal({ ptyProcess: ptyProcess });

            // Listeners
            dockerPtyTerminal.onoutput = (commandResult) => {
                console.log("commandResult", commandResult)
                peer.send(JSON.stringify(commandResult));
            };
            dockerPtyTerminal.onclose = devLogger.debug;
        }

        if (messageObj.eventName == "command") {
            const commandJSON = messageObj.data; 
            if(dockerPtyTerminal) {
                dockerPtyTerminal.write(commandJSON);
            }
        }
    };

});
