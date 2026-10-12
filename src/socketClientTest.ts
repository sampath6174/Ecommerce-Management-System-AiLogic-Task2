import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);

    socket.emit("clientListener", {
        message: "Hello from client"
    });
});

socket.on("serverMessage", (data: { message: string }) => {
    console.log("Response from server:", data.message);
});

socket.on(
    "newOrder",
    (data: { orderId: number; status: string }) => {
        console.log("New order received!");
        console.log("Order ID:", data.orderId);
        console.log("Status:", data.status);
    }
);

socket.on("connect_error", (error) => {
    console.error("Connection failed:", error.message);
});