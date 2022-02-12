import { IPty } from "node-pty";

export const startDockerContainer = (ptyProcess: IPty, image: string, memoryLimit: string, cpus: string, cpuShares: string) => {
    let dockerRunCommand = `docker run -it --rm --privileged=true --memory="${memoryLimit}" --cpus="${cpus}" --cpu-shares="${cpuShares}" ${image} bash\r`
    ptyProcess.write(dockerRunCommand);
    return ptyProcess;
}
