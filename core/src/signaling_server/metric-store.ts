
interface ContainerMetric {
    Name: string;
    [key: string]: string;
}

export interface MetricRequest {
    roomName: string;
    availableCpu: string;
    availableMemory: string;
    availableDisk: string;
    containers?: {
        [key: string]: ContainerMetric
    }
}

export interface Metric extends MetricRequest {
    lastUpdated: string;
    containerHistory: ContainerMetric[]
}

interface MetricStore {
    [key: string]: Metric
}

const MAX_CONTAINER_METRICS_TO_STORE = 10;
class METRIC_STORE {
    _store: MetricStore = {}

    set = (metricReq: MetricRequest): boolean => {
        const existingMetric = this._store[metricReq.roomName];
        let containerHistory = existingMetric ? [...existingMetric.containerHistory, ...Object.values(metricReq.containers || [])] : [...Object.values(metricReq.containers || [])]

        if(containerHistory.length > MAX_CONTAINER_METRICS_TO_STORE) {
            containerHistory.splice(MAX_CONTAINER_METRICS_TO_STORE, containerHistory.length - MAX_CONTAINER_METRICS_TO_STORE)
        }

        let metric: Metric = {
            ...metricReq,
            containerHistory: containerHistory,
            lastUpdated: new Date().toISOString(),
        }

        this._store[metric.roomName] = metric
        return true
    }
    
    get = (roomName: string): Metric => {
        return this._store[roomName]
    }
    
    list = (): Metric[] => {
        return Object.values(this._store)
    }
}

export default new METRIC_STORE()
