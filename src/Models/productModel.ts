import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/database";

class Product extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare price: number;
    declare stock: number;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true
    }
);

export default Product;