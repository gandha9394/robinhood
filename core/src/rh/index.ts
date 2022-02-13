#!/usr/bin/env node
import { Command, Option } from "commander";
import figlet from "figlet";
import { yellowBright, bold } from "colorette";
import { loginUser } from "rh/cli/auth.js";
import { initializeDaemon, killDaemon, restartDaemon } from "rh/cli/daemon.js";
import { connectToDonor, listDonors } from "./cli/consumer";
import { SUPPORTED_IMAGES } from "./config";
const program = new Command();

program
    .name("rh")
    .description("Share your resources through Robinhood")
    .version("0.1.0");

///////////////////////
// Auth commands
///////////////////////
program
    .command("login")
    .argument("<email>", "Email of the user")
    .description("Login to rh")
    .action(loginUser);

///////////////////////
// Daemon commands
///////////////////////
program
    .command("init")
    .option("--max-cpu <percent>", "Max CPU % to allocate")
    .option("--max-memory <percent>", "Max Memory % to allocate")
    .option("--max-disk <size>", "Max disk space to allocate")
    .description("Initialize rh daemon")
    .action((options:any, ...args:any) => {
        initializeDaemon(options.maxCpu, options.maxMemory, options.maxDisk);
    });

program
    .command("kill")
    .description("Kill rh daemon")
    .action(killDaemon);

program
    .command("restart")
    .description("Restart rh daemon")
    .action(restartDaemon);

///////////////////////
//  commands
///////////////////////
program
    .command("list")
    .description("List donors to connect")
    .action(listDonors);

program
    .command("connect")
    .argument("[donorName]", "Donor name to connect")
    .addOption(new Option('-o, --os <image>', 'OS to run on donor').choices(SUPPORTED_IMAGES))
    .description("Connect to a donor")
    .action((donorName, options) => {
        if(donorName) {
            connectToDonor(donorName, options.os)
        } else {
            listDonors(options.os)
        }
    });


const init = () => {
    console.log(
        yellowBright(
            bold(
                figlet.textSync("Robinhood", {
                    font: "Standard",
                    horizontalLayout: "default",
                    verticalLayout: "default",
                    width: 80,
                    whitespaceBreak: true,
                })
            )
        )
    );
};

init();
program.parse();
