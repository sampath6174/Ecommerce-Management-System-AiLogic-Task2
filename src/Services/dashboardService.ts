import User from "../Models/userModel";
import Product from "../Models/productModel";
import Order from "../Models/orderModel";

class DashboardService {
    async getDashboardStats() {
        const totalUsers = await User.count();

        const totalCustomers = await User.count({
            where: { role: "CUSTOMER" }
        });

        const totalProducts = await Product.count();

        const totalOrders = await Order.count();

        const pendingOrders = await Order.count({
            where: { status: "PENDING" }
        });

        const deliveredOrders = await Order.count({
            where: { status: "DELIVERED" }
        });

        const orders = await Order.findAll();

        const totalRevenue = orders.reduce(
            (total, order) => total + Number(order.totalAmount),
            0
        );

        return {
            totalUsers,
            totalCustomers,
            totalProducts,
            totalOrders,
            pendingOrders,
            deliveredOrders,
            totalRevenue
        };
    }
}

export default DashboardService;