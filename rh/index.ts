#!/usr/bin/env node
import { Command, Option } from "commander";
import figlet from "figlet";
import { yellowBright, bold } from "colorette";
import { loginUser, logoutCurrentUser } from "./cli/auth.js";
import { initializeDaemon, killDaemon, restartDaemon } from "./cli/daemon.js";
import { connectToDonor, listDonors } from "./cli/consumer.js";
import { SUPPORTED_IMAGES } from "./config.js";

const program = new Command();

program
    .name("rh")
    .description("Share your machine resources with the ones who need them")
    .version("0.1.1");

///////////////////////
// Auth commands
///////////////////////
program
    .command("login")
    .argument("<email>", "Email of the user")
    .description("Login to rh")
    .action(loginUser);

program
    .command("logout")
    .description("Logout current user")
    .action(logoutCurrentUser);

///////////////////////
// Daemon commands
///////////////////////
program
    .command("init")
    .option("--max-cpu <percent>", "Max CPU % to allocate")
    .option("--max-memory <percent>", "Max Memory % to allocate")
    .option("--max-disk <size>", "Max disk space to allocate")
    .description("Initialize rh daemon")
    .action((options) => {
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
// Consumer commands
///////////////////////
program
    .command("list")
    .description("List donors to connect")
    .action(() => listDonors());

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
