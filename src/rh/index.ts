#!/usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import { yellowBright, bold } from "colorette";
import { loginUser } from "./cli/auth.js";
import { initializeDaemon, killDaemon, restartDaemon } from "./cli/daemon.js";

const program = new Command();

program
    .name("rh")
    .description("Share your resources through Robinhood")
    .version("0.1.0");

program
    .command("login")
    .argument("<email>", "Email of the user")
    .description("Login to rh")
    .action(loginUser);

program
    .command("init")
    .option("--max-cpu <percent>", "Max CPU % to allocate")
    .option("--max-memory <percent>", "Max Memory % to allocate")
    .option("--max-disk <size>", "Max disk space to allocate")
    .description("Initialize rh daemon")
    .action((options, ...args) => {
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
