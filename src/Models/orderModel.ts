import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/database";

class Order extends Model {
    declare id: number;
    declare customerId: number;
    declare totalAmount: number;
    declare status:
        | "PENDING"
        | "CONFIRMED"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED";
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
            ),
            allowNull: false,
            defaultValue: "PENDING"
        }
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true
    }
);

export default Order;