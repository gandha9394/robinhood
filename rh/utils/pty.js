let os = require('os');
let pty = require('node-pty');

let shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const spawnShell = () => {
    return pty.spawn(shell);
}

module.exports = {
    spawnShell
}
