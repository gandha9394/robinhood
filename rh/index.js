#! /usr/bin/env node
const pm2 = require("pm2")
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const { MAIN_CLI_OPTIONS, DEFAULT_MEMORY_LIMIT, DEFAULT_CPUS, DEFAULT_CPU_SHARES, DEFAULT_PORT, DAEMON_PROCESS_KEY } = require("./config")
const { spawnShell } = require('./utils/pty')
const { startDaemon, restartDaemon, stopDaemon } = require('./utils/pm2')
const logger = require("./utils/log")

const args = yargs(hideBin(process.argv))
    .options(MAIN_CLI_OPTIONS)
    .argv

logger.debug("Arguments:", args)

const main = () => {
    if (args.consumer) {
        logger.info("#####################")
        logger.info("# Consumer mode")
        logger.info("#####################\n")
    } else {
        logger.info("#####################")
        logger.info("# Donor mode")
        logger.info("#####################\n")
        
        const memoryLimit = args.memory || DEFAULT_MEMORY_LIMIT
        const cpus = args.cpus || DEFAULT_CPUS
        const cpuShares = args["cpu-shares"] || DEFAULT_CPU_SHARES
        const port = args.port || DEFAULT_PORT
        
        logger.warn("#####################")
        logger.warn("# Daemon config")
        logger.warn("#####################")
        logger.warn("memoryLimit\t", memoryLimit)
        logger.warn("cpus\t\t", cpus)
        logger.warn("cpuShares\t", cpuShares)
        logger.warn("port\t\t", port)
        logger.warn("#####################\n")
    
        pm2.connect(async (err) => {
            if (err) {
                console.error(err)
            }
    
            pm2.list(async (err, list) => {
                if(err) {
                    console.error(err)
                    return pm2.disconnect()
                }
    
                const daemonProcess = list.find((item) => item.name == DAEMON_PROCESS_KEY);
    
                if (daemonProcess) {
                    // Kill
                    if(args.kill) {
                        await stopDaemon(pm2).catch(console.error)
                        return pm2.disconnect()
                    }
    
                    // Monit
                    if(args.monit) {
                        if(daemonProcess.pm2_env.status == "stopped") {
                            await restartDaemon(pm2).catch(console.error)
                        }
                        const ptyProcess = spawnShell()
                        ptyProcess.onData((data) => {
                            process.stdout.write(data);
                        });
                        ptyProcess.write("pm2 monit\r")
                        return pm2.disconnect()
                    }
    
                    // Default
                    if(daemonProcess.pm2_env.status == "stopped") {
                        logger.info("Daemon not running.")
                        await startDaemon(pm2).catch(console.error)
                    } else {
                        logger.info("Daemon already running. Run 'rh --monit' to monitor")
                    }
                } else {
                    if(!args.kill) {
                        await startDaemon(pm2).catch(console.error)
                    } else {
                        logger.info("Daemon not running.")
                    }
                }
                pm2.disconnect()
            })
    
        })
    }
}
main()
