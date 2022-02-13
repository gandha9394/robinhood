import express from "express";
const router = express.Router();
import MetricStore, { MetricRequest, Metric } from "./metric-store.js";

router.use(express.json());

// List metrics
router.get("/", (req, res) => {
    try {
        const response: { metrics: Metric[] } = {
            metrics: MetricStore.list(),
        };
        return res.json(response);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

// Update metrics
router.post("/", (req, res) => {
    try {
        const metric: MetricRequest = req.body;
        MetricStore.set(metric);
        return res.sendStatus(200);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

// Get metric from roomName
router.get("/:roomName", (req, res) => {
    try {
        const roomName: string = req.params.roomName;
        const metric: Metric = MetricStore.get(roomName);
        if (!metric) {
            return res.sendStatus(404);
        } else {
            return res.json(metric);
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;
