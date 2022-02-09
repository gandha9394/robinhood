const yargs = require("yargs/yargs")
const WebSocket = require("ws")
const { hideBin } = require("yargs/helpers")
const { CONTAINER_CLI_OPTIONS } = require("../config")
const logger = require("../utils/log")

const args = yargs(hideBin(process.argv))
    .options(CONTAINER_CLI_OPTIONS)
    .argv

logger.debug("Arguments:", args, "\n")

// /////////////
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
    console.log('Connected to the Server!');
});


socket.addEventListener('message', (msg) => {
    console.log(`Client Received: ${msg.data}`);
});


const sendMsg = () => {
    console.log("Sending message")
    socket.send(JSON.stringify({
        "test": "Hello!"
    }));
}
setTimeout(() => {
    sendMsg()
}, 2000)