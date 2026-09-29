import { Request, Response } from "express";
import UserService from "../Services/userService";

class UserController {
    private userService = new UserService()
    async register(req: Request, res: Response) {
        const { name, email, username, password } = req.body
        const user = await this.userService.registerCustomer(name, email, username, password)
        return res.status(201).send("User Registered successfully")
    }
    async login(req: Request, res: Response) {
        const { username,email, password } = req.body;

        const tokens = await this.userService.loginUser(
            username,
            email,
            password
        );

        return res.status(200).json({message:"Login successful", ...tokens});
    }
    async deleteUser(req: Request, res: Response) {
    const targetUserId = Number(req.params.id);
    const requestingUserId = (req as any).user.userId

    const result = await this.userService.deleteUser(targetUserId,requestingUserId);

    return res.status(200).send(result);
}

async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    return res.status(200).json(users);
}

async getUserById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const user = await this.userService.getUserById(userId);

    return res.status(200).json(user);
}

async getAllCustomers(req: Request, res: Response) {
    const customers = await this.userService.getAllCustomers();

    return res.status(200).json(customers);
}

async getCustomerById(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    const customer = await this.userService.getCustomerById(customerId);

    return res.status(200).json(customer);
}

async createUser(req: Request, res: Response) {
    const { name, email, username, password } = req.body;

    const user = await this.userService.createUser(
        name,
        email,
        username,
        password
    );

    return res.status(201).send(
        "User created successfully"
    );
}
}


export default UserController;