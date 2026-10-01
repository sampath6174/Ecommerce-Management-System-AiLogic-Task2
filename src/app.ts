import  express  from "express";
import userRoutes from "./Routes/userRoutes";
import productRoutes from "./Routes/productRoutes";
import orderRoutes from "./Routes/orderRoutes";
import dashboardRoutes from "./Routes/dashboardRoutes";
import { swaggerSpec, swaggerUi } from "./Config/swagger";
import errorMiddleware from "./Middlewares/errorMiddleware";
const app = express();
app.use(express.json())
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware)
export default app;