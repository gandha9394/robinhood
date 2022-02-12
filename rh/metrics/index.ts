import minimist from "minimist"
import { devLogger } from "../utils/log.js";

const argv = minimist(process.argv.slice(2));

devLogger.info("Running daemon-metrics script")
devLogger.debug("Arguments: " + JSON.stringify(argv))

devLogger.info("Sending metrics...")

