import { body } from "express-validator";

const productValidation = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .notEmpty()
        .withMessage("Product description is required"),

    body("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isFloat({ min: 0 })
        .withMessage("Product price must be a positive number"),

    body("stock")
        .notEmpty()
        .withMessage("Product stock is required")
        .isInt({ min: 0 })
        .withMessage("Product stock must be a positive integer")
];

export default productValidation;