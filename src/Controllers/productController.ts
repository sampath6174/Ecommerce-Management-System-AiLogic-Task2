import { Request, Response, NextFunction } from "express";
import ProductService from "../Services/productService";

interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
}

class ProductController {

    private productService = new ProductService();

    async createProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                name,
                description,
                price,
                stock
            } = req.body as ProductRequest;

            const product = await this.productService.createProduct(
                name,
                description,
                price,
                stock
            );

            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await this.productService.getAllProducts();

            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const productId = Number(req.params.id);

            const product = await this.productService.getProductById(
                productId
            );

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const productId = Number(req.params.id);

            const {
                name,
                description,
                price,
                stock
            } = req.body as ProductRequest;

            const product = await this.productService.updateProduct(
                productId,
                name,
                description,
                price,
                stock
            );

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const productId = Number(req.params.id);

            const result = await this.productService.deleteProduct(
                productId
            );

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;