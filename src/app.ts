import  express  from "express";
import userRoutes from "./Routes/userRoutes";
import { swaggerSpec, swaggerUi } from "./Config/swagger";
const app = express();
app.use(express.json())
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;