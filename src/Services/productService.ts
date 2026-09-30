import Product from "../Models/productModel";

class ProductService {

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

    async getAllProducts() {
        return await Product.findAll();
    }

    async getProductById(productId: number) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

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