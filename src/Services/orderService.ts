import Order from "../Models/orderModel";
import Product from "../Models/productModel";

class OrderService {

    async createOrder(
        customerId: number,
        productId: number,
        quantity: number
    ) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.stock < quantity) {
            throw new Error("Insufficient stock");
        }

        const totalAmount = Number(product.price) * quantity;

        const order = await Order.create({
            customerId,
            totalAmount,
            status: "PENDING"
        });

        product.stock = product.stock - quantity;
        await product.save();

        return order;
    }

    async getAllOrders() {
        return await Order.findAll();
    }

    async getOrderById(orderId: number) {
        const order = await Order.findByPk(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    }

    async getCustomerOrders(customerId: number) {
        return await Order.findAll({
            where: {
                customerId
            }
        });
    }


    // ORDER STATUS UPDATE
    async updateOrderStatus(
    orderId: number,
    newStatus:
        | "CONFIRMED"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED"
) {
    const order = await Order.findByPk(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    const allowedTransitions: {
        [key: string]: string[];
    } = {
        PENDING: ["CONFIRMED", "CANCELLED"],
        CONFIRMED: ["PROCESSING", "CANCELLED"],
        PROCESSING: ["SHIPPED"],
        SHIPPED: ["DELIVERED"],
        DELIVERED: [],
        CANCELLED: []
    };

    if (!allowedTransitions[order.status].includes(newStatus)) {
        throw new Error(
            `Cannot change order status from ${order.status} to ${newStatus}`
        );
    }

    order.status = newStatus;

    await order.save();

    return order;
}
}

export default OrderService;