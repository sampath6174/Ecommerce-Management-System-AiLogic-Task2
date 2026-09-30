import { Router } from "express";

import OrderController from "../Controllers/orderController";

import authMiddleware from "../Middlewares/authMiddleware";

import roleMiddleware from "../Middlewares/roleMiddleware";

import orderValidation from "../Validations/orderValidation";

import validator from "../Validations/validator";

const router = Router();

const orderController = new OrderController();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["CUSTOMER"]),
    orderValidation,
    validator,
    orderController.createOrder.bind(orderController)
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    orderController.getAllOrders.bind(orderController)
);

router.get(
    "/my-orders",
    authMiddleware,
    roleMiddleware(["CUSTOMER"]),
    orderController.getCustomerOrders.bind(orderController)
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    orderController.getOrderById.bind(orderController)
);

export default router;