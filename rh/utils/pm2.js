const { DAEMON_PROCESS_KEY } = require("../config")
const logger = require("./log")

exports.startDaemon = (pm2) => {
    return new Promise((resolve, reject) => {
        logger.info("Starting daemon...")
        pm2.start({
            script: './daemon',
            name: DAEMON_PROCESS_KEY,
            args: ["--test"],
            max_restarts: 1
        }, (err, apps) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            logger.info("Daemon started.")
            resolve(apps)
        })
    })
}

exports.restartDaemon = (pm2) => {
    return new Promise((resolve, reject) => {
        logger.info("Restarting existing daemon...")
        pm2.restart(DAEMON_PROCESS_KEY, (err, proc) => {
            if(err) {
                console.error(err)
                reject(err)
            }
            logger.info("Daemon restarted.")
            resolve(proc)
        })
    })
}

exports.stopDaemon = (pm2) => {
    return new Promise((resolve, reject) => {
        logger.info("Stopping existing daemon...")
        pm2.stop(DAEMON_PROCESS_KEY, (err, proc) => {
            if(err) {
                console.error(err)
                reject(err)
            }
            logger.info("Daemon stopped.")
            resolve(proc)
        })
    })
}
