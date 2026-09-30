import { body } from "express-validator";

const orderValidation = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a valid number"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0")
];

export default orderValidation;