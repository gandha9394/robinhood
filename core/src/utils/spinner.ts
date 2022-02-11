import readline from "readline";

export default function spinner(msg:string) {
  process.stdout.write("\\033[2J");
  for (let i = 0; i < process.stdout.getWindowSize()[1]; i++)
    process.stdout.write("\r\n");
  let frame = 0;
  const frames = ["—", "\\", "|", "/"];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const { rows, cols } = rl.getCursorPos();
  const interval = setInterval(() => {
    process.stdout.write(frames[frame++ % 4]+" "+msg);
    readline.cursorTo(process.stdout, rows, cols);
  }, 100);
  return () => clearInterval(interval);
}
