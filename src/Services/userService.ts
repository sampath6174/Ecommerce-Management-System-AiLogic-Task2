import User from "../Models/userModel";
import argon2 from "argon2";
import TokenService from "./tokenService";


class UserService {
    private tokenService = new TokenService();
    async registerCustomer(
        name: string,
        email: string,
        username: string,
        password: string,
    ) {
        const existingUser = await User.findOne({
            where: { email: email },
        });
        if (existingUser) {
            throw new Error("email already exists");
        }
        const existingUsername = await User.findOne({
            where: {
                username: username,
            },
        });
        if (existingUsername) {
            throw new Error("username already exists");
        }
        const hashedPassword = await argon2.hash(password)
        const user = await User.create({ name, username, email, password: hashedPassword })
        return user
    }
    async loginUser(
        username: string | undefined,
        email: string | undefined,
        password: string
    ) {
        const whereCondition = username
            ? { username: username }
            : { email: email };

        const user = await User.findOne({
            where: whereCondition
        });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await argon2.verify(
            user.password,
            password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }
        const accessToken = this.tokenService.generateAccessToken(
            user.id,
            user.role
        );

        const refreshToken = this.tokenService.generateRefreshToken(
            user.id
        );

        return { accessToken, refreshToken };
    }
    async deleteUser(targetUserId: number, requestingUserId: number) {
        const targetUser = await User.findByPk(targetUserId);
        const requestingUser = await User.findByPk(requestingUserId);

        if (!targetUser) {
            throw new Error("User not found");
        }
        if (!requestingUser) {
            throw new Error("Requesting user not found");
        }

        if (targetUser.role === "ADMIN") {
            throw new Error("Admin cannot be deleted");
        }

        if (targetUser.role === "USER") {
            if (requestingUser.role === "CUSTOMER") {
                throw new Error("Customer cannot delete user")
            }

        }
        if (requestingUser.role === "CUSTOMER") {
            if (targetUserId !== requestingUserId) {
                throw new Error("Customer can delete only their own account");
            }
        }
        await targetUser.destroy();

        return {
            message: "User deleted successfully"
        };
    }
    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(userId: number) {
        return await User.findByPk(userId);
    }

    async getAllCustomers() {
        return await User.findAll({
            where: { role: "CUSTOMER" }
        });
    }

    async getCustomerById(customerId: number) {
        return await User.findOne({
            where: {
                id: customerId,
                role: "CUSTOMER"
            }
        });
    }
    async createUser(
    name: string,
    email: string,
    username: string,
    password: string
) {
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const existingUsername = await User.findOne({
        where: { username }
    });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        role: "USER"
    });

    return user;
}
}

export default UserService;
