const { spawnShell } = require("../utils/pty")

const ptyProcess = spawnShell()

ptyProcess.onData(data => {
    process.stdout.write(data);
})

ptyProcess.write(`docker stats --no-stream --format "{{ json . }}" | grep "rh-container"\r`)
