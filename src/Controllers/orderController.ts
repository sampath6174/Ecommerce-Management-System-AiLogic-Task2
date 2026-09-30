import { Request, Response, NextFunction } from "express";
import OrderService from "../Services/orderService";

interface OrderRequest {
    productId: number;
    quantity: number;
}

class OrderController {

    private orderService = new OrderService();

    async createOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { productId, quantity } =
                req.body as OrderRequest;

            const customerId = (req as any).user.userId;

            const order = await this.orderService.createOrder(
                customerId,
                productId,
                quantity
            );

            return res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    async getAllOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orders = await this.orderService.getAllOrders();

            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    async getOrderById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orderId = Number(req.params.id);

            const order = await this.orderService.getOrderById(
                orderId
            );

            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async getCustomerOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const customerId = (req as any).user.userId;

            const orders =
                await this.orderService.getCustomerOrders(
                    customerId
                );

            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }


    // ORDER STATUS UPDATE
    async updateOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body;

        const order = await this.orderService.updateOrderStatus(
            orderId,
            status
        );

        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}
}

export default OrderController;