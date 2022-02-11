import {
    DAEMON_METRICS_PROCESS_NAME,
    DAEMON_METRICS_PROCESS_SCRIPT,
    DAEMON_PROCESS_NAME,
    DAEMON_PROCESS_SCRIPT,
    DEFAULT_MAX_CPU,
    DEFAULT_MAX_DISK,
    DEFAULT_MAX_MEMORY,
    getUserPreferences,
    setUserPreferences,
} from "../config.js";
import { connectToPM2, PM2Process, PM2Error } from "./process.js";
import inquirer, { Answers, Question } from "inquirer";
import { red, magenta } from "colorette";
import { ProcessDescription } from "pm2";

export const initializeDaemon = async (maxCpu: string, maxMemory: string, maxDisk: string) => {
    return new Promise<void>(async (resolve, reject) => {
        const pm2: any = await connectToPM2();

        // Check if daemon is running
        const dummyDaemonProcess = new DaemonProcess(pm2)
        const isRunning = await dummyDaemonProcess.isRunning()
        if(isRunning) {
            console.log(red("Daemon already running. Please kill existing daemon using `rh kill` command."))
            process.exit();
        }

        const { maxCpu: savedMaxCpu, maxMemory: savedMaxMemory, maxDisk: savedMaxDisk } = getUserPreferences();

        // Ask for limits if not provided
        let questions: Question[] = [];
        if(!maxCpu) {
            questions.push({
                type: "input",
                name: "maxCpu",
                message: "How much CPU do you wish to allocate?",
                default: savedMaxCpu || DEFAULT_MAX_CPU,
                validate(value: any) {
                    const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
                    return valid || "Please enter a number between 0 and 100 (non-inclusive)";
                }
            })
        }
        if(!maxMemory) {
            questions.push({
                type: "input",
                name: "maxMemory",
                message: "How much memory do you wish to allocate?",
                default: savedMaxMemory || DEFAULT_MAX_MEMORY,
                validate(value: any) {
                    const valid = !isNaN(parseFloat(value)) && value > 0 && value < 100;
                    return valid || "Please enter a number between 0 and 100 (non-inclusive)";
                }
            })
        }
        if(!maxDisk) {
            questions.push({
                type: "input",
                name: "maxDisk",
                message: "How much disk do you wish to allocate?",
                default: savedMaxDisk || DEFAULT_MAX_DISK,
            })
        }
        await inquirer
            .prompt(questions)
            .then((answers: Answers) => {
                maxCpu = maxCpu || answers.maxCpu
                maxMemory = maxMemory || answers.maxMemory
                maxDisk = maxDisk || answers.maxDisk
            })
            .catch((error: any) => {
                if (error.isTtyError) {
                    console.log(red("Prompt couldn't be rendered in the current environment"))
                    process.exit()
                } else {
                    console.error(error)
                }
            });

        // Save preference in persisted config
        setUserPreferences(maxCpu, maxMemory, maxDisk);

        const daemonProcess = new DaemonProcess(pm2, maxCpu, maxMemory, maxDisk);
        daemonProcess
            .start()
            .then(() => {
                pm2.disconnect();
                resolve();
            })
            .catch((err) => reject(err));
    });
};

export const killDaemon = async () => {
    return new Promise<void>(async (resolve, reject) => {
        const pm2: any = await connectToPM2();
        const existingDaemonProcess = new DaemonProcess(pm2);
        existingDaemonProcess
            .delete()
            .then(() => {
                pm2.disconnect();
                resolve();
            })
            .catch((err) => reject(err));
    });
};

export class DaemonProcess {
    _pm2: any;
    daemon: PM2Process;
    daemonMetrics: PM2Process;
    maxCpu: string;
    maxMemory: string;
    maxDisk: string;

    constructor(pm2: any, maxCpu: string = "", maxMemory: string = "", maxDisk: string = "") {
        this._pm2 = pm2;
        this.maxCpu = maxCpu;
        this.maxMemory = maxMemory;
        this.maxDisk = maxDisk;
        this.daemon = new PM2Process(pm2, DAEMON_PROCESS_SCRIPT, DAEMON_PROCESS_NAME, "daemon", [
            "--test",
        ]);
        this.daemonMetrics = new PM2Process(
            pm2,
            DAEMON_METRICS_PROCESS_SCRIPT,
            DAEMON_METRICS_PROCESS_NAME,
            "daemon-metrics",
            ["--test"],
            "*/5 * * * * *"
        );
    }

    start = async () => {
        return Promise.all([this.daemon.startProcess(), this.daemonMetrics.startProcess()]);
    };

    restart = async () => {
        return Promise.all([this.daemon.restartProcess(), this.daemonMetrics.restartProcess()]);
    };

    stop = async () => {
        return Promise.all([this.daemon.stopProcess(), this.daemonMetrics.stopProcess()]);
    };

    delete = async () => {
        return Promise.all([this.daemon.deleteProcess(), this.daemonMetrics.deleteProcess()]);
    };

    isRunning = async () => {
        return new Promise<boolean>((resolve, reject) => {
            this._pm2.list(async (err: PM2Error, list: ProcessDescription[]) => {
                if(err) {
                    console.error(err)
                    reject(err)
                }
    
                const daemonProcess = list.find((item: ProcessDescription) => item.name == this.daemon.processName && item.pm2_env!.status == "online");
                const daemonMetricsProcess = list.find((item: ProcessDescription) => item.name == this.daemonMetrics.processName && item.pm2_env!.status == "online");

                if(daemonProcess && daemonMetricsProcess) {
                    resolve(true)
                } else {
                    if(daemonProcess) {
                        console.log(magenta("Process daemon running"))
                        return resolve(true)
                    }
                    if(daemonMetricsProcess) {
                        console.log(magenta("Process daemon-metrics running"))
                        return resolve(true)
                    }
                    resolve(false)
                }
            });
        })
    };
}
