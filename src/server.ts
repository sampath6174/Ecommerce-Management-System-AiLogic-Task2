import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import dotenv from "dotenv";
import sequelize from "./Config/database";
import redisClient from "./Config/redis";
import "./Services/orderWorker";
import "./cronJob";
dotenv.config();
const PORT = process.env.PORT || 5000

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

sequelize.authenticate()
    .then(async () => {
        console.log("Database connected Successfully")
        try {
            await redisClient.connect();
            console.log("redis connected successfully")

            httpServer.listen(PORT, () => {
                console.log(`Server is running on ${PORT}`)
            })

        } catch (error) {
            console.log("redis connection failed", error)

        }
    }).catch((error) => {
        console.error("Database connection failed!", error)
    })
