import { Command, InvalidArgumentError, Option } from "commander";
import figlet from "figlet";
import { yellowBright, bold } from "colorette";
import { loginUser } from "../utils/auth.js";
import { DonorActions } from "./cli/donor.js";
import { DoneeActions } from "./cli/donee.js";
import { BrokerActions } from "./cli/broker.js";

import { SUPPORTED_IMAGES } from "./config.js";
import { andThen, pipe } from "ramda";
const program = new Command();

program
  .name("rh")
  .description("Share your resources through Robinhood")
  .version("0.1.0");

///////////////////////
// Auth commands // NOT IMPLEMENTED
///////////////////////
program
  .command("login")
  .argument("<email>", "Email of the user")
  .description("Login to rh")
  .action(loginUser);

///////////////////////
// Donor Commands
///////////////////////
program
  .command("init")
  .option("--max-cpu <percent>", "Max CPU % to allocate")
  .option("--max-memory <percent>", "Max Memory % to allocate")
  .option("--max-disk <size>", "Max disk space to allocate")
  .description("Initialize rh daemon")
  .action((options: any, _: any) => {
    DonorActions.init(options.maxCpu, options.maxMemory, options.maxDisk);
  });

program.command("kill").description("Kill rh daemon").action(DonorActions.stop);

program
  .command("restart")
  .description("Restart rh daemon")
  .action(DonorActions.restart);

///////////////////////
// Consumer commands
///////////////////////
program
  .command("list")
  .description("List donors to connect")
  .action(async () => {
    pipe(
      DoneeActions.listRooms,
      andThen(DoneeActions.chooseFromAvailableRooms),
      andThen(DoneeActions.checkRoomAvailability),
      andThen(DoneeActions.obtainImageName)
    )().then(([roomName, image]) => DoneeActions.connect(roomName, image));
  });

program
  .command("connect")
  .argument("[roomName]", "Donor name to connect")
  .addOption(
    new Option("-o, --os <image>", "OS to run on donor").choices(
      SUPPORTED_IMAGES
    )
  )
  .description("Connect to a donor")
  .action(async (roomName, { os }) => {
    if (roomName) {
      DoneeActions.connect(roomName, os); // os means image
    } else {
      pipe(
        DoneeActions.listRooms,
        andThen(DoneeActions.chooseFromAvailableRooms),
        andThen(DoneeActions.checkRoomAvailability)
      )().then((roomName) => DoneeActions.connect(roomName, os));
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
    BrokerActions.startServer(options.port);
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
