import Conf from "conf";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

//////////////////////////////////
// Global config
//////////////////////////////////
export const DEFAULT_MAX_CPU = process.env.DEFAULT_MAX_CPU || "50";
export const DEFAULT_MAX_MEMORY = process.env.DEFAULT_MAX_MEMORY || "25";
export const DEFAULT_MAX_DISK = process.env.DEFAULT_MAX_DISK || "1G";

export const DEFAULT_DAEMON_PORT = process.env.DEFAULT_DAEMON_PORT || "8080";

export const DAEMON_PROCESS_SCRIPT = __dirname + "/daemon/index.js";
export const DAEMON_PROCESS_NAME = "rh-daemon";

export const DAEMON_METRICS_PROCESS_SCRIPT = __dirname + "/metrics/index.js";
export const DAEMON_METRICS_PROCESS_NAME = "rh-daemon-metrics";
export const CONTAINER_PREFIX = "rh_container";

export const SUPPORTED_IMAGES = ["ubuntu", "debian", "fedora"]

// export const CENTRAL_SERVER = process.env.CENTRAL_SERVER || "34.133.251.43:8080"
export const CENTRAL_SERVER = process.env.CENTRAL_SERVER || "34.133.251.43:8080"
export const SIGNALING_SERVER = `ws://${CENTRAL_SERVER}`

//////////////////////////////////
// Persisted config
//////////////////////////////////
const persistedConfig = new Conf({ projectName: 'robinhood-cli' });

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

// Donor preferences
export const setDonorPreferences = (maxCpu: string, maxMemory: string, maxDisk: string): void => {
    persistedConfig.set(`preferences.maxCpu`, maxCpu);
    persistedConfig.set(`preferences.maxMemory`, maxMemory);
    persistedConfig.set(`preferences.maxDisk`, maxDisk);
};

export const getDonorPreferences = (): Record<string, string> => {
    const maxCpu = persistedConfig.get(`preferences.maxCpu`) as string;
    const maxMemory = persistedConfig.get(`preferences.maxMemory`) as string;
    const maxDisk = persistedConfig.get(`preferences.maxDisk`) as string;
    return { maxCpu, maxMemory, maxDisk };
};

export const deleteDonorPreferences = (): void => {
    persistedConfig.delete(`preferences.maxCpu`);
    persistedConfig.delete(`preferences.maxMemory`);
    persistedConfig.delete(`preferences.maxDisk`);
};

// Consumer preferences
export const setConsumerPreferences = (image: string): void => {
    persistedConfig.set(`preferences.image`, image);
};

export const getConsumerPreferences = (): Record<string, string> => {
    const image = persistedConfig.get(`preferences.image`) as string;
    return { image };
};

export const deleteConsumerPreferences = (): void => {
    persistedConfig.delete(`preferences.image`);
};

const adjectives = [
    'autumn',    'hidden',    'bitter',    'misty',
    'silent',    'empty',     'dry',       'dark',
    'summer',    'icy',       'delicate',  'quiet',
    'white',     'cool',      'spring',    'winter',
    'patient',   'twilight',  'dawn',      'crimson',
    'wispy',     'weathered', 'blue',      'billowing',
    'broken',    'cold',      'damp',      'falling',
    'frosty',    'green',     'long',      'late',
    'lingering', 'bold',      'little',    'morning',
    'muddy',     'old',       'red',       'rough',
    'still',     'small',     'sparkling', 'wandering',
    'withered',  'wild',      'black',     'young',
    'holy',      'solitary',  'fragrant',  'aged',
    'snowy',     'proud',     'floral',    'restless',
    'divine',    'polished',  'ancient',   'purple',
    'lively',    'nameless'
]

const nouns = [
    'waterfall',  'river',   'breeze',   'moon',
    'rain',       'wind',    'sea',      'morning',
    'snow',       'lake',    'sunset',   'pine',
    'shadow',     'leaf',    'dawn',     'glitter',
    'forest',     'hill',    'cloud',    'meadow',
    'sun',        'glade',   'bird',     'brook',
    'butterfly',  'bush',    'dew',      'dust',
    'field',      'fire',    'flower',   'firefly',
    'feather',    'grass',   'haze',     'mountain',
    'night',      'pond',    'darkness', 'snowflake',
    'silence',    'sound',   'sky',      'shape',
    'surf',       'thunder', 'violet',   'water',
    'wildflower', 'wave',    'water',    'resonance',
    'sun',        'wood',    'dream',    'cherry',
    'tree',       'fog',     'frost',    'voice',
    'paper',      'frog',    'smoke',    'star'
];

export const generateName = () => {
    const adjective = adjectives[Math.floor(Math.random()*adjectives.length)];
    const noun = nouns[Math.floor(Math.random()*nouns.length)];
    return `${adjective}_${noun}`
}
