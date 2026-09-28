import User from "../Models/userModel";
import argon2 from "argon2";

async function createAdmin() {
    const hashedPassword = await argon2.hash("Admin@123");

    await User.create({
        name: "Owner",
        email: "owner@ecommerce.com",
        username: "owner",
        password: hashedPassword,
        role: "ADMIN"
    });

    console.log("Admin created successfully");
}

createAdmin();