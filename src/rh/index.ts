#!/usr/bin/env node
import { Command, InvalidArgumentError, Option } from "commander";
import figlet from "figlet";
import { yellowBright, bold } from "colorette";
import { loginUser } from "rh/cli/auth.js";
import { initializeDaemon, killDaemon, restartDaemon } from "rh/cli/daemon.js";
import { connectToDonor, listDonors } from "./cli/consumer";
import { SUPPORTED_IMAGES } from "./config";
import InitBroker from "signaling_server";
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
  .action((options: any, ...args: any) => {
    initializeDaemon(options.maxCpu, options.maxMemory, options.maxDisk);
  });

program.command("kill").description("Kill rh daemon").action(killDaemon);

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
  .action(()=>listDonors());

program
  .command("connect")
  .argument("[donorName]", "Donor name to connect")
  .addOption(
    new Option("-o, --os <image>", "OS to run on donor").choices(
      SUPPORTED_IMAGES
    )
  )
  .description("Connect to a donor")
  .action((donorName, options) => {
    if (donorName) {
      connectToDonor(donorName, options.os);
    } else {
      listDonors(options.os);
    }
  });
program
  .command("init-broker", { hidden: true })
  .addOption(
    new Option("-p,--port <port>", "Port to start the signalling server")
      .default("8080")
      .argParser<number>(parsePort)
  )
  .description("Start the WebRTC signaling server")
  .action((options) => {
    InitBroker(options.port);
  });

function parsePort(port: string, _: number): number {
  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort))
    throw new InvalidArgumentError(
      "Port should be a number between 4000 and 9000"
    );
  if (parsedPort < 4000 || parsedPort > 9000)
    throw new InvalidArgumentError(
      "Port should be a number between 4000 and 9000"
    );
  return parsedPort;
}

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
