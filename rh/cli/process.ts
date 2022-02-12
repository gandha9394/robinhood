import { green } from "colorette";
import pm2, { Proc, StartOptions } from "pm2";
import CLI from "clui";
const { Spinner } = CLI;

// TODO: Import type of pm2 instance (entire module)
// Wish this was exported from PM2 library so I wouldn't have to redefine it :/
export interface PM2Error {
    name: string;
    message: string;
    stack?: string;
}

export const connectToPM2 = async () => {
    const snipper = new Spinner(`Connecting to PM2...`);
    snipper.start();
    return new Promise((resolve, reject) => {
        pm2.connect((err: PM2Error) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            snipper.stop();
            resolve(pm2);
        });
    });
};

export class PM2Process {
    _pm2: any;
    scriptPath: string;
    processName: string;
    displayName: string;
    args: string[];
    cron: string | null;

    constructor(
        pm2Instance: any,
        scriptPath: string,
        processName: string,
        displayName: string,
        args: string[],
        cron: string | null = null
    ) {
        this._pm2 = pm2Instance;
        this.scriptPath = scriptPath;
        this.processName = processName;
        this.displayName = displayName;
        this.args = args;
        this.cron = cron;
    }

    startProcess = async () => {
        return new Promise((resolve, reject) => {
            const snipper = new Spinner(`Starting ${this.displayName} process...`);
            snipper.start();
            const startConfig: StartOptions = {
                script: "node",
                name: this.processName,
                args: [this.scriptPath, ...this.args],
                cron: this.cron,
            };
            this._pm2.start(startConfig, (err: PM2Error, proc: Proc) => {
                snipper.stop();
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log(green(`Process ${this.displayName} started.`));
                resolve(proc);
            });
        });
    };

    restartProcess = () => {
        return new Promise((resolve, reject) => {
            const snipper = new Spinner(`Restarting ${this.displayName} process...`);
            snipper.start();
            this._pm2.restart(this.processName, (err: PM2Error, proc: Proc) => {
                snipper.stop();
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log(green(`Process ${this.displayName} restarted.`));
                resolve(proc);
            });
        });
    };

    stopProcess = () => {
        return new Promise((resolve, reject) => {
            const snipper = new Spinner(`Stopping ${this.displayName} process...`);
            snipper.start();
            this._pm2.stop(this.processName, (err: PM2Error, proc: Proc) => {
                snipper.stop();
                if (err) {
                    if(err.message == "process or namespace not found") {
                        console.log(green(`Process ${this.displayName} already stopped.`));
                        resolve(proc);
                    } else {
                        console.error(err);
                        reject(err);
                    }
                    return;
                }
                console.log(green(`Process ${this.displayName} stopped.`));
                resolve(proc);
            });
        });
    };

    deleteProcess = () => {
        return new Promise((resolve, reject) => {
            const snipper = new Spinner(`Deleting ${this.displayName} process...`);
            snipper.start();
            this._pm2.delete(this.processName, (err: PM2Error, proc: Proc) => {
                snipper.stop();
                if (err) {
                    if(err.message == "process or namespace not found") {
                        console.log(green(`Process ${this.displayName} already deleted.`));
                        resolve(proc);
                    } else {
                        console.error(err);
                        reject(err);
                    }
                    return;
                }
                console.log(green(`Process ${this.displayName} deleted.`));
                resolve(proc);
            });
        });
    };
}
