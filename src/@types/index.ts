
export interface ContainerMetric {
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

