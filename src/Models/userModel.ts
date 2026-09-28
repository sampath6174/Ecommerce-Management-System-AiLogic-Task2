import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/database";

class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare role: "ADMIN" | "USER" | "CUSTOMER";
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM("ADMIN", "USER", "CUSTOMER"),
        allowNull: false,
        defaultValue: "CUSTOMER",
    },

   
}, {
    sequelize,
    tableName: "users",
    timestamps: true,
});
export default User;
