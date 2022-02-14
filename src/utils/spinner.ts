import readline from "node:readline";

type Interval = ReturnType<typeof setInterval>;
export default function spinner(msg: string, waitForSeconds?: number, callback?: (i: Interval) => undefined) {
    console.log("\\033[2J");
    for (let i = 0; i < process.stdout.getWindowSize()[1]; i++) console.log("\r\n");
    let frame = 0;
    const frames = ["—", "\\", "|", "/"];
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const { rows, cols } = rl.getCursorPos();
    let count = 0;
    const interval = setInterval(() => {
        if (waitForSeconds && count > waitForSeconds * 10) {
            (callback && callback(interval)) || clearInterval(interval);
        }
        process.stdout.write("   " + frames[frame++ % 4] + " " + msg);
        readline.cursorTo(process.stdout, rows, cols);
        count++;
    }, 100);
    return () => {
        readline.cursorTo(process.stdout, rows, cols);
        process.stdout.write("\r\n");
        readline.clearLine(process.stdout, 0);
        clearInterval(interval);
    };
}
