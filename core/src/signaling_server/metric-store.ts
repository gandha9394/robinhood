
interface MetricContainer {
    name: string;
    cpu: string;
    memory: string;
}

export interface MetricRequest {
    roomName: string;
    availableCpu: string;
    availableMemory: string;
    availableDisk: string;
    containers?: {
        [key: string]: MetricContainer
    }
}

export interface Metric extends MetricRequest {
    lastUpdated: string;
}

interface MetricStore {
    [key: string]: Metric
}


class METRIC_STORE {
    _store: MetricStore = {}

    set = (metricReq: MetricRequest): boolean => {
        let metric: Metric = {
            ...metricReq,
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
