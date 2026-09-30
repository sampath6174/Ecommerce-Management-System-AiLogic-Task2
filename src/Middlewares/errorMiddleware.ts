import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        message: error.message || "Internal server error"
    });
};

export default errorMiddleware;