import { Router } from "express";
import DashboardController from "../Controllers/dashboardController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";

const router = Router();

const dashboardController = new DashboardController();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    dashboardController.getDashboardStats.bind(dashboardController)
);

export default router;