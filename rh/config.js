require('dotenv').config()

exports.DEBUG = process.env.ENV.toLocaleLowerCase() == "development"
exports.LOG_LEVEL = process.env.LOG_LEVEL || "debug"

exports.DEFAULT_IMAGE = process.env.DEFAULT_IMAGE || "ubuntu"
exports.DEFAULT_MEMORY_LIMIT = process.env.DEFAULT_MEMORY_LIMIT || "1g"
exports.DEFAULT_CPUS = process.env.DEFAULT_CPUS || "1.0"
exports.DEFAULT_CPU_SHARES = process.env.DEFAULT_CPU_SHARES || "1024"
exports.DEFAULT_PORT = process.env.DEFAULT_PORT || "8080"

exports.DAEMON_PROCESS_KEY = "rh-daemon"

exports.CONTAINER_CLI_OPTIONS = {
    "memory": {
        describe: "Define memory limit",
        type: "string",
        requiresArgs: true
    },
    "cpus": {
        describe: "Define # of CPUs",
        type: "string",
        requiresArgs: true
    },
    "cpu-shares": {
        describe: "Define CPU power limit",
        type: "string",
        requiresArgs: true
    },
    "port": {
        alias: "p",
        describe: "Define CPU power limit",
        type: "string",
        requiresArgs: true
    },
}

exports.MAIN_CLI_OPTIONS = {
    "server": {
        alias: "s",
        describe: "Server mode",
        type: "boolean",
        default: true
    },
    "stop": {
        describe: "Stop the running containers",
        type: "string"
    },
    "kill": {
        describe: "Kill the daemon",
        type: "boolean"
    },
    ...this.CONTAINER_CLI_OPTIONS,
    "consumer": {
        alias: "c",
        describe: "Consumer mode",
        type: "boolean"
    },
}

