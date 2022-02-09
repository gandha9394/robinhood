
exports.startDockerContainer = (ptyProcess, image, memoryLimit, cpus, cpuShares) => {
    let dockerRunCommand = `docker run -it --rm --privileged=true --memory="${memoryLimit}" --cpus="${cpus}" --cpus-shares="${cpuShares}" ${image} bash\r`
    ptyProcess.write(dockerRunCommand);
    return ptyProcess;
}
