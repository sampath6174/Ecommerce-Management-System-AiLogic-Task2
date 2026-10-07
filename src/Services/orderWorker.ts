import { Worker } from "bullmq";

const orderWorker = new Worker(
    "orderQueue",
    async (job) => {
        console.log("Processing job:", job.name);
        console.log("Order ID:", job.data.orderId);
    },
    {
        connection: {
            host: "localhost",
            port: 6379
        }
    }
);

orderWorker.on("completed", (job) => {
    console.log("Job completed:", job.id);
});

orderWorker.on("failed", (job, error) => {
    console.error("Job failed:", error);
});

orderWorker.on("error", (error) => {
    console.error("Worker error:", error);
});

export default orderWorker;