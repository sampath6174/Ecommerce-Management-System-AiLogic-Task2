// BUSINESS LOGICS
import Product from "../Models/productModel";

class ProductService {

    // creating a product by admin&user but not customer
    async createProduct(
        name: string,
        description: string,
        price: number,
        stock: number
    ) {
        const product = await Product.create({
            name,
            description,
            price,
            stock
        });

        return product;
    }
    // getting all products info
    async getAllProducts() {
        return await Product.findAll({
            order: [["id", "ASC"]]
        });
    }
    // get product by their id
    async getProductById(productId: number) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    // updating product info only admin&user
    async updateProduct(
        productId: number,
        name: string,
        description: string,
        price: number,
        stock: number
    ) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        await product.update({
            name,
            description,
            price,
            stock
        });

        return product;
    }

    // deleting a product
    async deleteProduct(productId: number) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        await product.destroy();

        return {
            message: "Product deleted successfully"
        };
    }
}

export default ProductService;