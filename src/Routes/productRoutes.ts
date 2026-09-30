import { Router } from "express";
import ProductController from "../Controllers/productController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import productValidation from "../Validations/productValidation";
import validator from "../Validations/validator";

const router = Router();

const productController = new ProductController();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    productValidation,
    validator,
    productController.createProduct.bind(productController)
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER", "CUSTOMER"]),
    productController.getAllProducts.bind(productController)
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER", "CUSTOMER"]),
    productController.getProductById.bind(productController)
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    productValidation,
    validator,
    productController.updateProduct.bind(productController)
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    productController.deleteProduct.bind(productController)
);

export default router;