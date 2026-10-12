import cron from "node-cron";
import Order from "./Models/orderModel";

console.log("cronJob.ts loaded");

cron.schedule("* * * * *", async () => {
    console.log("Cron job is running");

    const pendingOrders = await Order.count({
        where: {
            status: "PENDING"
        }
    });

    console.log(`Pending orders: ${pendingOrders}`);
});