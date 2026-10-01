import { Request, Response, NextFunction } from "express";
import DashboardService from "../Services/dashboardService";

class DashboardController {
    private dashboardService = new DashboardService();

    async getDashboardStats(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const stats = await this.dashboardService.getDashboardStats();

            return res.status(200).json(stats);
        } catch (error) {
            next(error);
        }
    }
}

export default DashboardController;