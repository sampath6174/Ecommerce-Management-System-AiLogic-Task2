import { body } from "express-validator";

const loginValidation = [
    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    body()
        .custom((value) => {
            if (!value.username && !value.email) {
                throw new Error("Username or email is required");
            }

            if (value.username && value.email) {
                throw new Error("Provide either username or email, not both");
            }

            return true;
        })
];

export default loginValidation;