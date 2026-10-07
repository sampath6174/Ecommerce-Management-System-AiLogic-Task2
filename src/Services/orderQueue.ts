import { Queue } from "bullmq";

const orderQueue = new Queue("orderQueue", {
    connection: {
        host: "localhost",
        port: 6379
    }
});
export async function addOrderJob(orderId: number) {
    await orderQueue.add("orderNotification", { orderId: orderId })
    console.log("Order job added to queue");
}

export default orderQueue;