import fetch from "isomorphic-fetch";
import inquirer, { Answers } from "inquirer";
import { red, green, bold } from "colorette";
import { clearANSIFormatting, PseudoTerminal } from "../utils/pty.js";
import { RTCDoneePeer } from "../utils/webrtc.js";
import { getConsumerPreferences, setConsumerPreferences, CENTRAL_SERVER, SIGNALING_SERVER, SUPPORTED_IMAGES } from "../config.js";
import CLI from "clui";
const { Spinner } = CLI;


interface MetricContainer {
    name: string;
    cpu: string;
    memory: string;
}

interface MetricRequest {
    roomName: string;
    availableCpu: string;
    availableMemory: string;
    availableDisk: string;
    containers?: {
        [key: string]: MetricContainer
    }
}

interface Metric extends MetricRequest {
    lastUpdated: string;
}

export const listDonors = async (image?: string) => {
    return new Promise<void>(async (resolve, reject) => {
        const snipper = new Spinner(`Fetching list of avaiable donors...`);
        snipper.start();

        const url = `http://${CENTRAL_SERVER}/metrics`
        let donors: Metric[] = await fetch(url)
            .then(res => {
                snipper.stop();
                if(res.status != 200) {
                    throw new Error(JSON.stringify(res))
                }
                return res.json()
            })
            .then((res) => {
                return res.metrics;
            })
            .catch((err) => {
                console.log(err)
            })

        const SEPARATOR = "∘"
        const donorSelectionList: any[] = donors.map(donor => {
            const timeDiff = Math.round((new Date().getTime() - new Date(donor.lastUpdated).getTime()) / 1000);
            const specs = `${bold(donor.roomName)} \n  CPU: ${donor.availableCpu} ${SEPARATOR} Memory: ${donor.availableMemory} ${SEPARATOR} Disk: ${donor.availableDisk} ${SEPARATOR} Udated ${timeDiff} seconds ago \n`;
            return { name: specs, value: donor.roomName }
        })

        let roomName: string = ""
        await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'roomName',
                    message: 'Here is a list of available donors. Select one to connect.',
                    choices: donorSelectionList
                }
            ])
            .then((answers: Answers) => {
                roomName = answers.roomName
            })
            .catch((error: any) => {
                if (error.isTtyError) {
                    console.log(red("Prompt couldn't be rendered in the current environment"))
                    process.exit()
                } else {
                    console.error(error)
                }
            }); 

        await connectToDonor(roomName, image)
        resolve();
    });
};

export const connectToDonor = async (roomName: string, image?: string) => {
    return new Promise<void>(async (resolve, reject) => {
        const snipper = new Spinner(`Verifying '${roomName}'...`);
        snipper.start();

        const url = `http://${CENTRAL_SERVER}/metrics/${roomName}`
        await fetch(url)
            .then(res => {
                snipper.stop();
                if(res.status != 200) {
                    console.log(red("Donor not available. Try checking for avaiable donors using `rh list`."))
                    process.exit(1);
                }
                return res.json()
            })
            .catch((err) => {
                console.log(err)
            })

        const { image: savedImage } = getConsumerPreferences();
        
        if(!image) {
            await inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'image',
                        message: 'Choose an OS to run remotely: ',
                        choices: SUPPORTED_IMAGES,
                        default: savedImage
                    }
                ])
                .then((answers: Answers) => {
                    image = answers.image
                })
                .catch((error: any) => {
                    if (error.isTtyError) {
                        console.log(red("Prompt couldn't be rendered in the current environment"))
                        process.exit()
                    } else {
                        console.error(error)
                    }
                }); 
        } else {
            console.log(green(`\nOS to run: ${bold(image)}`))
        }

        // Save image in consumer preferences
        setConsumerPreferences(image!)

        startPeeringConnection(roomName, image!)
    });
};

const startPeeringConnection = (roomName: string, image: string) => {
    const snipper = new Spinner(`Connecting to '${roomName}'...`);
    snipper.start();
    
    // Start peering connection
    const peer = new RTCDoneePeer({
        roomName: roomName,
        signalingServer: SIGNALING_SERVER
    });

    // Start pseudo terminal
    const ptyTerminal = new PseudoTerminal();

    peer.on("connection_established", () => {
        snipper.stop()
        
        ptyTerminal.print({
            type: "RSLT",
            data: "Connected to peer! \n\n"
        });

        peer.onmessage = (commandResult: string) => {
            const commandResultJSON = JSON.parse(commandResult);
            ptyTerminal.print(commandResultJSON);
            if(clearANSIFormatting(commandResultJSON.data).trim() == "exit") {
                terminateProcess(peer)
            }
        };
    
        // Immediately send container creation command
        peer.send(
            JSON.stringify({
                eventName: "create_container",
                data: {
                    image: image
                }
            })
        );
    
        ptyTerminal.oninput = (command) => {
            return peer.send(
                JSON.stringify({
                    eventName: "command",
                    data: command
                })
            );
        };

        // Is this of any use?
        ptyTerminal.onclose = console.log

        process.on("SIGINT", () => confirmBeforeTerminate(peer));
    });
}

const confirmBeforeTerminate = async (peer: RTCDoneePeer) => {
    console.log(
        "\n\nAre you sure? Your connection will be terminated. (y/Y)"
    );
    var stdin = process.openStdin();
    stdin.addListener("data", (d) => {
        const response = d.toString().trim();
        if (response === "y" || response === "Y") {
            terminateProcess(peer)
        }
        return;
    });
}

const terminateProcess = (peer: RTCDoneePeer) => {
    peer.send(
        JSON.stringify({
            eventName: "command",
            data: {
                type: "CMD",
                data: "exit\n"
            }
        })
    );
    peer.close();
    const stdin = process.openStdin();
    stdin.removeAllListeners();
    process.exit(1);
}
