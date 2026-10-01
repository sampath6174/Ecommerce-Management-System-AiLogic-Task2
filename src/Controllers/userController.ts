import { Request, Response, NextFunction } from "express";
import UserService from "../Services/userService";

interface RegisterRequest {
    name: string;
    email: string;
    username: string;
    password: string;
}

interface LoginRequest {
    username?: string;
    email?: string;
    password: string;
}

interface CreateStaffRequest {
    name: string;
    email: string;
    username: string;
    password: string;
}

class UserController {
    private userService = new UserService()

    // Register
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, username, password } = req.body as RegisterRequest
            const user = await this.userService.registerCustomer(name, email, username, password)
            return res.status(201).send("User Registered successfully")
        } catch (error) {
            next(error)
        }
    }


    // LOGIN
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { username, email, password } = req.body;

            const tokens = await this.userService.loginUser(
                username,
                email,
                password
            );

            return res.status(200).json({
                message: "Login successful",
                ...tokens
            });
        } catch (error) {
            next(error);
        }
    }
    // REFRESH ACCESS TOKEN
    async refreshAccessToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { refreshToken } = req.body;

            const result = await this.userService.refreshAccessToken(
                refreshToken
            );

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }


    // DELETE USER
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const targetUserId = Number(req.params.id);
            const requestingUserId = (req as any).user.userId

            const result = await this.userService.deleteUser(targetUserId, requestingUserId);

            return res.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }

    // GET ALL USERS
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }

    // GET USER BY ID
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.id);

            const user = await this.userService.getUserById(userId);

            return res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }

    // GET ALL CUSTOMERS
    async getAllCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const customers = await this.userService.getAllCustomers();

            return res.status(200).json(customers);
        } catch (error) {
            next(error)
        }
    }

    // GET CUSTOMER BY ID
    async getCustomerById(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.id);

            const customer = await this.userService.getCustomerById(customerId);

            return res.status(200).json(customer);
        } catch (error) {
            next(error)
        }
    }

    // CREATE NEW USER
    async createStaff(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, username, password } = req.body as CreateStaffRequest;

            const user = await this.userService.createStaff(
                name,
                email,
                username,
                password
            );

            return res.status(201).send(
                "Staff member created successfully"
            );
        } catch (error) {
            next(error)
        }
    }

    async getAllStaffUsers(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const users = await this.userService.getAllStaffUsers();

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
}


export default UserController;