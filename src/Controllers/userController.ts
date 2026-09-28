import { Request, Response } from "express";
import UserService from "../Services/userService";

class UserController {
    private userService = new UserService()
    async register(req: Request, res: Response) {
        const { name, email, username, password } = req.body
        const user = await this.userService.registerUser(name, email, username, password)
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
}


export default UserController;