import { body } from "express-validator";

const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    body("username")
        .notEmpty()
        .withMessage("Username is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
];

export default registerValidation;