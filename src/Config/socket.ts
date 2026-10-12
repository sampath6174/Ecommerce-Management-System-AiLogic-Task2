import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

let io: Server | null = null;

export function initializeSocket(httpServer: HttpServer) {
    io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("clientListener", (data: { message: string }) => {
            console.log("Message from client:", data.message);

            socket.emit("serverMessage", {
                message: `Server received: ${data.message}`
            });
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}

export function emitNewOrder(order: { id: number; status: string }) {
    if (!io) {
        console.log("Socket.IO is not initialized");
        return;
    }

    io.emit("newOrder", {
        orderId: order.id,
        status: order.status
    });
}