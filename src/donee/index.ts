import logger from "../utils/log.js";
import { Command, PseudoTerminal, Terminal } from "../utils/pty.js";
import spinner from "../utils/spinner.js";
import { RTCDoneePeer } from "../utils/webrtc.js";

const pty = new PseudoTerminal();
let isConnectionEstablished: boolean = false;

const init = () => {
    return new RTCDoneePeer({
        roomName: "my_room_002",
        onclose: () => isConnectionEstablished && process.exit(1),
        signalingServer: process.env["RHSS"]
            ? process.env["RHSS"]
            : //  "ws://34.133.251.43:8080",
              "ws://localhost:8080"
    });
};

let peer = init();

const exitHandler = () => {
    if(!isConnectionEstablished){
      process.exit(1);
    }
    console.log(
        "\n \n Are you sure? Your connection will be terminated. – (y/Y) + Return to exit. Any other key + Return to continue."
    );
    var stdin = process.openStdin();
    stdin.addListener("data", function (d) {
        const response = d.toString().trim();
        if (response === "y" || response === "Y") {
            stdin.removeAllListeners();
            process.exit(1);
        }
        return;
    });
};

const validateCommand = (command: Command) => {
    console.log(command.data);
    if (command.data.toLowerCase().trim().includes("exit")) {
        exitHandler();
        return false;
    } else {
        return command;
    }
};
const retryConnection = (interval: ReturnType<typeof setInterval>) => {
    clearInterval(interval);
    let count = 0;
    const retryInterval = setInterval(() => {
        if (count > 4) {
            clearInterval(retryInterval);
            peer.close();
            console.log("Starting new connection...");
            peer = init();
            spinner("Trying to connect...", 20);
        }
        console.log(`Connection timed out. Retrying connection in ${count}`);
        count++;
    });
};

const stopSpinner = spinner("Trying to connect...", 5, retryConnection);

peer.onmessage = (commandResult: string) => {
    const commandResultJSON = JSON.parse(commandResult);
    pty.print(commandResultJSON);
};

peer.connectedToPeer().then(() => {
    isConnectionEstablished = true;
    stopSpinner();
    pty.print({
        type: "RSLT",
        data: "Connected to peer! \n\n"
    });

    peer.send(
        JSON.stringify({
            eventName: "create_container",
            data: ""
        })
    );

    pty.oninput = (command) => {
        // const validatedCmd = validateCommand(command);
        return peer.send(
            JSON.stringify({
                eventName: "command",
                data: command
            })
        );
    };
    pty.onclose = logger.debug;
});

process.on("SIGINT", function () {
    exitHandler();
});
