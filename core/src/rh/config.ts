import Conf from "conf";
import dotenv from "dotenv";
import { Answers } from "inquirer";
dotenv.config();

//////////////////////////////////
// Global config
//////////////////////////////////
export const DEFAULT_MAX_CPU = process.env.DEFAULT_MAX_CPU || "80";
export const DEFAULT_MAX_MEMORY = process.env.DEFAULT_MAX_MEMORY || "25";
export const DEFAULT_MAX_DISK = process.env.DEFAULT_MAX_DISK || "1G";

export const DEFAULT_DAEMON_PORT = process.env.DEFAULT_DAEMON_PORT || "8080";

export const DAEMON_PROCESS_SCRIPT = "dist/rh/daemon/index.js";
export const DAEMON_PROCESS_NAME = "rh-daemon";

export const DAEMON_METRICS_PROCESS_SCRIPT = "dist/rh/metrics/index.js";
export const DAEMON_METRICS_PROCESS_NAME = "rh-daemon-metrics";
export const CONTAINER_PREFIX = "rh-container-";

//////////////////////////////////
// Persisted config
//////////////////////////////////
const persistedConfig = new Conf();

// Auth
export const setAuthToken = (email: string, token: string): void => {
    persistedConfig.set(`tokens.${email}`, token);
};

export const getAuthToken = (email: string): string => {
    return persistedConfig.get(`tokens.${email}`) as string;
};

export const deleteAuthToken = (email: string): void => {
    persistedConfig.delete(`tokens.${email}`);
};

// Preferences
export const setUserPreferences = (maxCpu: string, maxMemory: string, maxDisk: string): void => {
    persistedConfig.set(`preferences.maxCpu`, maxCpu);
    persistedConfig.set(`preferences.maxMemory`, maxMemory);
    persistedConfig.set(`preferences.maxDisk`, maxDisk);
};

export const getUserPreferences = (): Record<string, string> => {
    const maxCpu = persistedConfig.get(`preferences.maxCpu`) as string;
    const maxMemory = persistedConfig.get(`preferences.maxMemory`) as string;
    const maxDisk = persistedConfig.get(`preferences.maxDisk`) as string;
    return { maxCpu, maxMemory, maxDisk };
};

export const deleteUserPreferences = (): void => {
    persistedConfig.delete(`preferences.maxCpu`);
    persistedConfig.delete(`preferences.maxMemory`);
    persistedConfig.delete(`preferences.maxDisk`);
};

export interface UserPreferenceAnswers extends Answers{
    maxCpu: string,
    maxMemory: string,
    maxDisk:string
}
