import { Command, InvalidArgumentError, Option } from "commander";
import figlet from "figlet";
import {
  bold,
  magentaBright,
  yellow,
  blackBright,
} from "colorette";
import { loginUser } from "../utils/auth.js";
import { DonorActions } from "./cli/donor.js";
import { DoneeActions } from "./cli/donee.js";
import { BrokerActions } from "./cli/broker.js";
import fetch from "isomorphic-fetch";

import { RANDOM_ANIME_QUOTES, SUPPORTED_IMAGES } from "./config.js";
import { andThen, pipe } from "ramda";
import boxen from "boxen";
import { Spinner } from "../utils/log.js";
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
  .action(async (options: any, _: any) => {
    DonorActions.init(options.maxCpu, options.maxMemory, options.maxDisk);
  });

program
  .command("kill")
  .description("Kill rh daemon")
  .action(DonorActions.killAll);

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

const init = async () => {
  Spinner.start(magentaBright("...Initializing"));
 const q = await fetch(RANDOM_ANIME_QUOTES).then((r) => r.json());
  Spinner.stop();
  console.log(
    boxen(
      '\n'+
      bold(
        yellow(
          figlet.textSync("Robinhood", {
            font: "Colossal",
            horizontalLayout: "default",
            verticalLayout: "default",
            whitespaceBreak: true,
            width:200,
          })
        )
      ),
      { borderStyle: "round",float:'center', title:"Resources for everyone...", titleAlignment:'center'}
    )
  );
  console.log(boxen(bold(blackBright(q.quote))+`                                                       -${q.character}(${q.anime})`,{float:'center',width:80})+'\n\n');
};


await init();
program.parse();
