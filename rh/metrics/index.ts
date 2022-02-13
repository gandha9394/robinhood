import fetch from "isomorphic-fetch"
import minimist from "minimist"
import { devLogger } from "../utils/log.js";
import { CENTRAL_SERVER } from "../config.js";

const argv = minimist(process.argv.slice(2));

const MAX_CPU = argv["max-cpu"]
const MAX_MEMORY = argv["max-memory"]
const MAX_DISK = argv["max-disk"]
const ROOM_NAME = argv["room-name"]

const url = `http://${CENTRAL_SERVER}/metrics`
const body = {
    "roomName": ROOM_NAME,
    "availableCpu": String(MAX_CPU),
    "availableMemory": String(MAX_MEMORY),
    "availableDisk": MAX_DISK,
}

devLogger.info("Sending metrics...")
devLogger.debug(body)

fetch(url, { 
    method: "POST", 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body) 
})
    .then(res => {
        if(res.status != 200) {
            throw new Error(JSON.stringify(res))
        }
        devLogger.info("Metrics sent")
    })
    .catch((err) => {
        devLogger.error("Failed to push metrics")
        console.log(err)
    })
